
declare const WAHealthDataManager: any, HKHealthStore : any; 

const LastSyncKey = "WAHealthKitLastSyncTimeStamp";

export function getHealthDataSince(date: Date) : Promise<any> {
    if (!date) {
        return Promise.reject(new Error("Need a since date to fetch information"));
    } else {
        console.log("Fetching data from "+date.toDateString());
    }
    return new Promise((resolve, reject) => {
        WAHealthDataManager.shared().getHealthDataSinceWithCompletionHandler(date, (response, error) => {
            if (error) {
                return reject(new Error(error.localizedDescription));
            }
            NSUserDefaults.standardUserDefaults.setObjectForKey(new Date(), LastSyncKey);
            try {
                const data : NSData = NSJSONSerialization.dataWithJSONObjectOptionsError(response, 0);
                const str : string = NSString.alloc().initWithDataEncoding(data, NSUTF8StringEncoding) as any;
                resolve(JSON.parse((str)  as string));
            } catch (err) {
                return reject(new Error("Error marshalling to string"));
            }
        })
    })
}

export function getHealthDataSinceLastSync() : Promise<any> {
    let date : Date = getLastSyncedAt();
    if (!date) {
        date = new Date();
        date.setDate(date.getDate() - 60);
    }
    return getHealthDataSince(date);
}

export function isHealthDataAvailable() : boolean {
    return HKHealthStore.isHealthDataAvailable;
}

export function getLastSyncedAt() : Date {
    return NSUserDefaults.standardUserDefaults.objectForKey(LastSyncKey);
}

export function resetLastSync() {
    return NSUserDefaults.standardUserDefaults.removeObjectForKey(LastSyncKey);
}