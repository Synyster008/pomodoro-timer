const appInsights = require("applicationinsights");

// Initialize Application Insights with your Instrumentation Key
appInsights.setup(process.env.APPINSIGHTS_INSTRUMENTATIONKEY).start();
const client = appInsights.defaultClient;

module.exports = async function (context, req) {
    if (req.body) {
        client.trackEvent({ name: "TimerEvent", properties: req.body });
    }

    context.res = {
        status: 200,
        body: "Telemetry Logged"
    };
};
