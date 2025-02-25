// Copyright 2023 MongoDB Inc
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Construct } from "constructs";
import * as atlas from "../../index";
import {
  ClusterProps,
  DatabaseUserProps,
  IpAccessListProps,
} from "../common/props";

const NODE_COUNT = 3;
const NODE_COUNT_ANALYTICS = 1;
const BACKUP_ENABLED = true;
const INSTANCE_SIZE = "M30";
const MONGODB_VERSION = "5.0";
const ENCRYPTION_AT_REST_PROVIDER =
  atlas.CfnClusterPropsEncryptionAtRestProvider.AWS;
const REGION = "US_EAST_1";
const EBS_VOLUME_TYPE = "STANDARD";
const ENABLE_ENCRYPTION_AT_REST = true;
const CLUSTER_TYPE = "REPLICASET";
const DB_NAME = "admin";
const USERNAME = "cdkUser";
const ROLE = [
  {
    roleName: "atlasAdmin",
    databaseName: "admin",
  },
];

function randomNumber() {
  const min = 10;
  const max = 9999999;
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getClusterProps(
  inputClusterProps: ClusterProps
): atlas.CfnClusterProps {
  return {
    name:
      inputClusterProps.name || "atlas-cluster-".concat(String(randomNumber())),
    mongoDbMajorVersion:
      inputClusterProps.mongoDbMajorVersion || MONGODB_VERSION,
    backupEnabled: inputClusterProps.backupEnabled || BACKUP_ENABLED,
    diskSizeGb: inputClusterProps.diskSizeGb,
    clusterType: inputClusterProps.clusterType || CLUSTER_TYPE,
    biConnector: inputClusterProps.biConnector,
    encryptionAtRestProvider:
      inputClusterProps.encryptionAtRestProvider || ENCRYPTION_AT_REST_PROVIDER,
    labels: inputClusterProps.labels,
    paused: inputClusterProps.paused,
    pitEnabled: inputClusterProps.pitEnabled,
    rootCertType: inputClusterProps.rootCertType,
    terminationProtectionEnabled:
      inputClusterProps.terminationProtectionEnabled,
    versionReleaseSystem: inputClusterProps.versionReleaseSystem,
    advancedSettings: inputClusterProps.advancedSettings,
    replicationSpecs:
      inputClusterProps.replicationSpecs || getDefaultClusterReplicationSpec(),
    projectId: "",
  };
}

function getDefaultClusterReplicationSpec(): atlas.AdvancedReplicationSpec[] {
  return [
    {
      numShards: 1,
      advancedRegionConfigs: [
        {
          analyticsSpecs: {
            ebsVolumeType: EBS_VOLUME_TYPE,
            instanceSize: INSTANCE_SIZE,
            nodeCount: NODE_COUNT_ANALYTICS,
          },
          electableSpecs: {
            ebsVolumeType: EBS_VOLUME_TYPE,
            instanceSize: INSTANCE_SIZE,
            nodeCount: NODE_COUNT,
          },
          priority: 7,
          regionName: REGION,
        },
      ],
    },
  ];
}

export interface EncryptionAtRestProps {
  /**
   * ID of an AWS IAM role authorized to manage an AWS customer master key.
   *
   * @schema AwsKms#RoleID
   */
  readonly roleId: string;
  /**
   * The AWS customer master key used to encrypt and decrypt the MongoDB master keys.
   *
   * @schema AwsKms#CustomerMasterKeyID
   */
  readonly customerMasterKeyId: string;
  /**
   * Specifies whether Encryption at Rest is enabled for an Atlas project. To disable Encryption at Rest, pass only this parameter with a value of false. When you disable Encryption at Rest, Atlas also removes the configuration details.
   * Default Value: true
   * @schema AwsKms#Enabled
   */
  readonly enabledEncryptionAtRest?: boolean;

  /**
   * The AWS region in which the AWS customer master key exists.
   *
   * @schema AwsKms#Region
   */
  readonly region?: string;
}

export interface AtlasEncryptionAtRestExpressProps {
  readonly cluster?: ClusterProps;
  readonly accessList?: IpAccessListProps;
  readonly encryptionAtRest: EncryptionAtRestProps;
  readonly databaseUser?: DatabaseUserProps;
  readonly profile?: string;
  readonly projectId: string;
}

export class AtlasEncryptionAtRestExpress extends Construct {
  readonly encryptionAtRest: atlas.CfnEncryptionAtRest;
  readonly cluster?: atlas.CfnCluster;
  readonly accessList?: atlas.CfnProjectIpAccessList;
  readonly databaseUser?: atlas.CfnDatabaseUser;

  constructor(
    scope: Construct,
    id: string,
    props: AtlasEncryptionAtRestExpressProps
  ) {
    super(scope, id);

    this.encryptionAtRest = new atlas.CfnEncryptionAtRest(
      this,
      "encryption-at-rest-".concat(id),
      {
        awsKms: {
          customerMasterKeyId: props.encryptionAtRest.customerMasterKeyId,
          roleId: props.encryptionAtRest.roleId,
          enabled:
            props.encryptionAtRest.enabledEncryptionAtRest ||
            ENABLE_ENCRYPTION_AT_REST,
          region: props.encryptionAtRest.region || REGION,
        },
        projectId: props.projectId,
        profile: props.profile,
      }
    );

    if (props.cluster) {
      // Create a new MongoDB Atlas Cluster and pass project ID
      const clusterProps = getClusterProps(props.cluster);
      this.cluster = new atlas.CfnCluster(this, "cluster-".concat(id), {
        ...clusterProps,
        profile: props.profile,
        projectId: props.projectId,
      });
    }

    if (props.databaseUser) {
      // Create a new MongoDB Atlas Database User
      this.databaseUser = new atlas.CfnDatabaseUser(
        this,
        "db-user-".concat(id),
        {
          ...props.databaseUser,
          profile: props.profile,
          databaseName: props.databaseUser?.databaseName || DB_NAME,
          projectId: props.projectId,
          username: props.databaseUser?.username || USERNAME,
          roles: props.databaseUser?.roles || ROLE,
          password: props.databaseUser.password,
        }
      );
    }

    if (props.accessList) {
      // Create a new MongoDB Atlas Project IP Access List
      this.accessList = new atlas.CfnProjectIpAccessList(
        this,
        "access-list-".concat(id),
        {
          ...props.accessList,
          profile: props.profile,
          projectId: props.projectId,
        }
      );
    }
  }
}
