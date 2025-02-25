// Generated by cdk-import
import * as cdk from "aws-cdk-lib";
import * as constructs from "constructs";

/**
 * Returns, starts, and cancels Cloud Backup restore jobs.
 *
 * @schema CfnCloudBackUpRestoreJobsProps
 */
export interface CfnCloudBackUpRestoreJobsProps {
  /**
   * The unique identifier of the project for the Atlas cluster.
   *
   * @schema CfnCloudBackUpRestoreJobsProps#ProjectId
   */
  readonly projectId: string;

  /**
   * The name of the Atlas cluster whose snapshot you want to restore or you want to retrieve restore jobs.
   *
   * @schema CfnCloudBackUpRestoreJobsProps#ClusterName
   */
  readonly clusterName: string;

  /**
   * The instance name of the Serverless cluster whose snapshot you want to restore or you want to retrieve restore jobs.
   *
   * @schema CfnCloudBackUpRestoreJobsProps#InstanceName
   */
  readonly instanceName?: string;

  /**
   * Type of restore job to create.The value can be any one of download,automated or point_in_time
   *
   * @schema CfnCloudBackUpRestoreJobsProps#DeliveryType
   */
  readonly deliveryType?: CfnCloudBackUpRestoreJobsPropsDeliveryType;

  /**
   * Indicates whether the restore job was canceled.
   *
   * @schema CfnCloudBackUpRestoreJobsProps#Cancelled
   */
  readonly cancelled?: boolean;

  /**
   * Indicates whether the restore job expired.
   *
   * @schema CfnCloudBackUpRestoreJobsProps#Expired
   */
  readonly expired?: boolean;

  /**
   * Unique identifier of the source snapshot ID of the restore job.
   *
   * @schema CfnCloudBackUpRestoreJobsProps#SnapshotId
   */
  readonly snapshotId?: string;

  /**
   * Timestamp in the number of seconds that have elapsed since the UNIX epoch from which to you want to restore this snapshot. This is the first part of an Oplog timestamp.
   *
   * @schema CfnCloudBackUpRestoreJobsProps#OpLogTs
   */
  readonly opLogTs?: string;

  /**
   * Oplog operation number from which to you want to restore this snapshot. This is the second part of an Oplog timestamp.
   *
   * @schema CfnCloudBackUpRestoreJobsProps#OpLogInc
   */
  readonly opLogInc?: string;

  /**
   * If you performed a Point-in-Time restores at a time specified by a Unix time in seconds since epoch, pointInTimeUTCSeconds indicates the Unix time used.
   *
   * @schema CfnCloudBackUpRestoreJobsProps#PointInTimeUtcSeconds
   */
  readonly pointInTimeUtcSeconds?: number;

  /**
   * Name of the target Atlas project of the restore job. Only visible if deliveryType is automated.
   *
   * @schema CfnCloudBackUpRestoreJobsProps#TargetProjectId
   */
  readonly targetProjectId?: string;

  /**
   * Name of the target Atlas cluster to which the restore job restores the snapshot. Only visible if deliveryType is automated.
   *
   * @schema CfnCloudBackUpRestoreJobsProps#TargetClusterName
   */
  readonly targetClusterName?: string;

  /**
   * Profile used to provide credentials information, (a secret with the cfn/atlas/profile/{Profile}, is required), if not provided default is used
   *
   * @schema CfnCloudBackUpRestoreJobsProps#Profile
   */
  readonly profile?: string;
}

/**
 * Converts an object of type 'CfnCloudBackUpRestoreJobsProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_CfnCloudBackUpRestoreJobsProps(
  obj: CfnCloudBackUpRestoreJobsProps | undefined
): Record<string, any> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    ProjectId: obj.projectId,
    ClusterName: obj.clusterName,
    InstanceName: obj.instanceName,
    DeliveryType: obj.deliveryType,
    Cancelled: obj.cancelled,
    Expired: obj.expired,
    SnapshotId: obj.snapshotId,
    OpLogTs: obj.opLogTs,
    OpLogInc: obj.opLogInc,
    PointInTimeUtcSeconds: obj.pointInTimeUtcSeconds,
    TargetProjectId: obj.targetProjectId,
    TargetClusterName: obj.targetClusterName,
    Profile: obj.profile,
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}
/* eslint-enable max-len, quote-props */

/**
 * Type of restore job to create.The value can be any one of download,automated or point_in_time
 *
 * @schema CfnCloudBackUpRestoreJobsPropsDeliveryType
 */
export enum CfnCloudBackUpRestoreJobsPropsDeliveryType {
  /** download */
  DOWNLOAD = "download",
  /** automated */
  AUTOMATED = "automated",
  /** pointInTime */
  POINT_IN_TIME = "pointInTime",
}

/**
 * A CloudFormation `MongoDB::Atlas::CloudBackUpRestoreJobs`
 *
 * @cloudformationResource MongoDB::Atlas::CloudBackUpRestoreJobs
 * @stability external
 */
export class CfnCloudBackUpRestoreJobs extends cdk.CfnResource {
  /**
   * The CloudFormation resource type name for this resource class.
   */
  public static readonly CFN_RESOURCE_TYPE_NAME =
    "MongoDB::Atlas::CloudBackUpRestoreJobs";

  /**
   * Resource props.
   */
  public readonly props: CfnCloudBackUpRestoreJobsProps;

  /**
   * Attribute `MongoDB::Atlas::CloudBackUpRestoreJobs.Id`
   */
  public readonly attrId: string;
  /**
   * Attribute `MongoDB::Atlas::CloudBackUpRestoreJobs.DeliveryUrl`
   */
  public readonly attrDeliveryUrl: string[];
  /**
   * Attribute `MongoDB::Atlas::CloudBackUpRestoreJobs.CreatedAt`
   */
  public readonly attrCreatedAt: string;
  /**
   * Attribute `MongoDB::Atlas::CloudBackUpRestoreJobs.ExpiresAt`
   */
  public readonly attrExpiresAt: string;
  /**
   * Attribute `MongoDB::Atlas::CloudBackUpRestoreJobs.FinishedAt`
   */
  public readonly attrFinishedAt: string;
  /**
   * Attribute `MongoDB::Atlas::CloudBackUpRestoreJobs.Timestamp`
   */
  public readonly attrTimestamp: string;

  /**
   * Create a new `MongoDB::Atlas::CloudBackUpRestoreJobs`.
   *
   * @param scope - scope in which this resource is defined
   * @param id    - scoped id of the resource
   * @param props - resource properties
   */
  constructor(
    scope: constructs.Construct,
    id: string,
    props: CfnCloudBackUpRestoreJobsProps
  ) {
    super(scope, id, {
      type: CfnCloudBackUpRestoreJobs.CFN_RESOURCE_TYPE_NAME,
      properties: toJson_CfnCloudBackUpRestoreJobsProps(props)!,
    });

    this.props = props;

    this.attrId = cdk.Token.asString(this.getAtt("Id"));
    this.attrDeliveryUrl = cdk.Token.asList(this.getAtt("DeliveryUrl"));
    this.attrCreatedAt = cdk.Token.asString(this.getAtt("CreatedAt"));
    this.attrExpiresAt = cdk.Token.asString(this.getAtt("ExpiresAt"));
    this.attrFinishedAt = cdk.Token.asString(this.getAtt("FinishedAt"));
    this.attrTimestamp = cdk.Token.asString(this.getAtt("Timestamp"));
  }
}
