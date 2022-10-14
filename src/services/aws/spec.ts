export interface IAwsProvider{
    groups():Promise<IAwsLogGroups[]|[]> 
    streams(groupName:string):Promise<IAwsStreams[]|[]> 
    logs(grouName:string, streams:string[]):Promise<IAwsLogs[]|[]> 
}

export interface IAwsLogGroups {
    logGroupName: string;
    creationTime: string;
    metricFilterCount: number;
    arn: string;
}

export interface IAwsStreams{
    group:string
    logStreamName:string
    creationTime:number
    firstEventTimestamp:number
    lastEventTimestamp:number
    lastIngestionTime:number
    uploadSequenceToken:string
    arn:string
    storedBytes: number
}

export interface IAwsLogs {
    logStreamName: string;
    timestamp: number;
    message: string;
    ingestionTime: number;
    eventId: string;
}