# nativescript-healthkit

A NativeScript plugin to fetch data from iOS Healthkit.

## Installation

```javascript
tns plugin add @webileapps/nativescript-healthkit
```

### Entitlements
Add the following file to your `app/App_Resources/iOS/app.entitlements` folder

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>com.apple.developer.healthkit</key>
	<true/>
	<key>com.apple.developer.healthkit.access</key>
	<array>
		<string>health-records</string>
	</array>
</dict>
</plist>
```
### Usage Strings.
The following plist keys are injected by the plugin. Create or add to `app/App_Resources/iOS/Info.plist` to override these.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>NSHealthClinicalHealthRecordsShareUsageDescription</key>
	<string>We need your clinical health data to aggregate your health stats over time.</string>
	<key>NSHealthShareUsageDescription</key>
	<string>We need your health data to aggregate your health stats over time.</string>
</dict>
</plist>
```


## Usage 

Find out if HealthKit is enabled on the device.

```typescript
import { isHealthDataAvailable } from "@webileapps/nativescript-healthkit"

console.log("Is health data available", isHealthDataAvailable());
```

Get healthdata since a previous date. Say, for the past 60 days.
```typescript
import { getHealthDataSince } from "@webileapps/nativescript-healthkit";

const date = new Date();
date.setDate(date.getDate() - 60);
try {
    const data = await getHealthDataSince(date);
    console.log(data.active_minutes, data.calories_expended, data.distance, data.heart_rate, data.step_count);
} catch (error) {
    console.error(error);
}
```

## License

Apache License Version 2.0, January 2004
