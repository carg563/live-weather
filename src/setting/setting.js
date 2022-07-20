"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jimu_core_1 = require("jimu-core");
var setting_components_1 = require("jimu-ui/advanced/setting-components");
function Setting(props) {
    //once the map is selected, assign it to the settings of the widget
    var onMapSelected = function (useMapWidgetIds) {
        props.onSettingChange({
            id: props.id,
            useMapWidgetIds: useMapWidgetIds
        });
    };
    return jimu_core_1.React.createElement("div", { className: "sample-js-api-widget-setting p-2" },
        jimu_core_1.React.createElement(setting_components_1.MapWidgetSelector, { onSelect: onMapSelected, useMapWidgetIds: props.useMapWidgetIds }));
}
exports.default = Setting;
//# sourceMappingURL=setting.js.map