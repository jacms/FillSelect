/**
 * SelectC8
 * @Copyright: Alan Mtz 
 * https://github.com/jacms
 * @version 1.0.0
 * @author jacms-c8
 */
(function () {
    //:: constructor
    this.SelectC8 = function () {
        //:: global elements
        var defaults = {
            element: null,
            list: [],
            valueProperty: "id",
            textProperty: "name",
            dataExtended: null,
            selectedValue: null,
            assignWithoutProperties: false,
            appendDefaultFirstOption: true,
            defaultFirstOptionValue: "",
            defaultFirstOptionText: "-- Select option --",
            onChange: null,
            onSuccess: function () {
                return false
            }
        };
        //:: create settings by extending defaults 
        if (arguments[0] && typeof arguments[0] === "object") {
            this.settings = extendDefaults(defaults, arguments[0]);
        }
    }
    //:: public methods
    SelectC8.prototype.fill = function () {
        if (arguments[0] && typeof arguments[0] === "object") {
            this.settings = extendDefaults(this.settings, arguments[0]);
        }
        init.call(this);
    }
    SelectC8.prototype.destroy = function () {
        destroy.call(this);
    }
    SelectC8.prototype.getValue = function () {
        return getValue.call(this);
    }
    SelectC8.prototype.setValue = function (value) {
        setValue.call(this, value);
    }
    //:: private methods
    function extendDefaults(source, properties) {
        let property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        return source;
    }
    //:: init build of select
    function destroy() {
        if (!isElementValid.call(this))
            return;
        this.settings.documentElement = getElement.call(this);
        clearElement(this.settings.documentElement);
    }

    function setValue(value) {
        if (value === undefined)
            return;
        if (!isElementValid.call(this))
            return;
        this.settings.documentElement.value = value;
    }

    function getValue() {
        if (!isElementValid.call(this))
            return undefined;
        return this.settings.documentElement.value;
    }

    function init() {
        if (!isElementValid.call(this))
            return;
        this.settings.documentElement = getElement.call(this);
        bulidSelect.call(this);
    }

    function isElementValid() {
        if (!this.settings.element)
            return false;
        if (this.settings.element.length === 0)
            return false;
        return true;
    }
    //:: build select
    function bulidSelect() {
        if (this.settings.documentElement.tagName !== "SELECT")
            return;
        clearElement(this.settings.documentElement);
        appendDefaultOption.call(this);
        appendOptions.call(this);
        selectedValue.call(this);
        setOnChange.call(this);
    }

    function setOnChange() {
        if (typeof this.settings.onChange !== "function")
            return;
        this.settings.documentElement.addEventListener("change", this.settings.onChange);
    }

    function selectedValue() {
        if (this.settings.selectedValue) {
            this.settings.documentElement.value = this.settings.selectedValue;
        }
    }

    function getElement() {
        let element;
        if (this.settings.element.tagName === "SELECT")
            element = this.settings.element;
        else
            element = document.getElementById(this.settings.element);
        return element;
    }

    function appendDefaultOption() {
        if (this.settings.appendDefaultFirstOption === true) {
            let option = document.createElement("option");
            option.text = this.settings.defaultFirstOptionText;
            option.value = this.settings.defaultFirstOptionValue;
            this.settings.documentElement.add(option);
        }
    }

    function appendOptions() {
        if (!this.settings.list)
            return;
        let values = getPropertyValues.call(this);
        values.forEach(object => {
            let option = document.createElement("option");
            option.text = object.text;
            option.value = object.value;
            if (this.settings.dataExtended && object[this.settings.dataExtended] !== undefined) {
                option.setAttribute([this.settings.dataExtended], object[this.settings.dataExtended]);
            }
            this.settings.documentElement.add(option);
        });
        this.settings.onSuccess(this.settings.list);
    }

    function getPropertyValues() {
        let values = [];
        this.settings.list.forEach(object => {
            let optionValue;
            if (this.settings.assignWithoutProperties === false) {
                optionValue = {
                    value: object[this.settings.valueProperty],
                    text: object[this.settings.textProperty]
                };
            } else {
                optionValue = {
                    value: object,
                    text: object
                };
            }
            if (this.settings.dataExtended && object[this.settings.dataExtended] !== undefined) {
                optionValue[this.settings.dataExtended] = object[this.settings.dataExtended];
            }
            values.push(optionValue);
        });
        return values;
    }
    //:: clear all options of select
    function clearElement(element) {
        let length = element.options.length;
        for (let i = length - 1; i >= 0; i--) {
            element.remove(i);
        }
    }
}());