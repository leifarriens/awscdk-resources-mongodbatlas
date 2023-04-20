// Generated by cdk-import
import * as cdk from "aws-cdk-lib";
import * as constructs from "constructs";

/**
 * Returns and edits the Encryption at Rest using Customer Key Management configuration.
 *
 * @schema CfnEncryptionAtRestProps
 */
export interface CfnEncryptionAtRestProps {
  /**
   * @schema CfnEncryptionAtRestProps#AwsKms
   */
  readonly awsKms: AwsKmsConfiguration;

  /**
   * The profile is defined in AWS Secret manager. See [Secret Manager Profile setup](../../../examples/profile-secret.yaml).
   *
   * @schema CfnEncryptionAtRestProps#Profile
   */
  readonly profile?: string;

  /**
   * Unique identifier of the Atlas project to which the user belongs.
   *
   * @schema CfnEncryptionAtRestProps#ProjectId
   */
  readonly projectId: string;
}

/**
 * Converts an object of type 'CfnEncryptionAtRestProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_CfnEncryptionAtRestProps(
  obj: CfnEncryptionAtRestProps | undefined
): Record<string, any> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    AwsKms: toJson_AwsKms(obj.awsKms),
    Profile: obj.profile,
    ProjectId: obj.projectId,
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}
/* eslint-enable max-len, quote-props */

/**
 * Specifies AWS KMS configuration details and whether Encryption at Rest is enabled for an Atlas project.
 *
 * @schema AwsKms
 */
export interface AwsKmsConfiguration {
  /**
   * ID of an AWS IAM role authorized to manage an AWS customer master key.
   *
   * @schema AwsKms#RoleID
   */
  readonly roleId?: string;

  /**
   * The AWS customer master key used to encrypt and decrypt the MongoDB master keys.
   *
   * @schema AwsKms#CustomerMasterKeyID
   */
  readonly customerMasterKeyId?: string;

  /**
   * Specifies whether Encryption at Rest is enabled for an Atlas project. To disable Encryption at Rest, pass only this parameter with a value of false. When you disable Encryption at Rest, Atlas also removes the configuration details.
   *
   * @schema AwsKms#Enabled
   */
  readonly enabled?: boolean;

  /**
   * The AWS region in which the AWS customer master key exists.
   *
   * @schema AwsKms#Region
   */
  readonly region?: string;
}

/**
 * Converts an object of type 'AwsKms' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_AwsKms(
  obj: AwsKmsConfiguration | undefined
): Record<string, any> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    RoleID: obj.roleId,
    CustomerMasterKeyID: obj.customerMasterKeyId,
    Enabled: obj.enabled,
    Region: obj.region,
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}
/* eslint-enable max-len, quote-props */

/**
 * A CloudFormation `MongoDB::Atlas::EncryptionAtRest`
 *
 * @cloudformationResource MongoDB::Atlas::EncryptionAtRest
 * @stability external
 */
export class CfnEncryptionAtRest extends cdk.CfnResource {
  /**
   * The CloudFormation resource type name for this resource class.
   */
  public static readonly CFN_RESOURCE_TYPE_NAME =
    "MongoDB::Atlas::EncryptionAtRest";

  /**
   * Resource props.
   */
  public readonly props: CfnEncryptionAtRestProps;

  /**
   * Attribute `MongoDB::Atlas::EncryptionAtRest.Id`
   */
  public readonly attrId: string;

  /**
   * Create a new `MongoDB::Atlas::EncryptionAtRest`.
   *
   * @param scope - scope in which this resource is defined
   * @param id    - scoped id of the resource
   * @param props - resource properties
   */
  constructor(
    scope: constructs.Construct,
    id: string,
    props: CfnEncryptionAtRestProps
  ) {
    super(scope, id, {
      type: CfnEncryptionAtRest.CFN_RESOURCE_TYPE_NAME,
      properties: toJson_CfnEncryptionAtRestProps(props)!,
    });

    this.props = props;

    this.attrId = cdk.Token.asString(this.getAtt("Id"));
  }
}
