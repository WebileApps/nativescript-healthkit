export function getHealthDataSince(date: Date) : Promise<any>;

export function isHealthDataAvailable() : boolean;

export function getHealthDataSinceLastSync() : Promise<any>;

export function isHealthDataAvailable() : boolean;

export function getLastSyncedAt() : Date;

export function resetLastSync();
