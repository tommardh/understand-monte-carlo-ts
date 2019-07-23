define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function repeatElements(tag, elements, prefix = "", index = false) {
        return `${elements.reduce((accumulator, currentValue, currentIndex) => {
            return `${accumulator}<${tag}>${prefix}${index ? currentIndex + 1 : currentValue}</${tag}>
`;
        }, "")}`;
    }
    exports.repeatElements = repeatElements;
    function generateButton(label, subject, value = 0) {
        return `<button
    class="w3-button w3-ripple w3-white w3-col"
    style="width:22%"
    onclick="send({
      subject: '${subject}',
      action: 'click',
      data: '${value}'
    })">
    ${label}
</button>
`;
    }
    exports.generateButton = generateButton;
    function generateDieButton(variable, value, values) {
        return `<button
    class="w3-button"
    onclick="send({
        subject: '${variable}',
        action: 'edit',
        data: '${value}',
    })">
    <img
        src="die${value + 1}.svg"
        height="24px"
        width="24px" />
    ${values[value]}
</button>`;
    }
    function generateDiceDropdown(variable, value, values, alignment = "left") {
        return `<div class="w3-dropdown-hover w3-squeed-black">
        <button class="w3-button">
            <img
                src="die${value + 1}.svg"
                height="24px"
                width="24px" />
        </button>
        <br/>
        ${values[value]}
        <div class="w3-dropdown-content w3-bar-block w3-card-4" style="${alignment}:0">
            ${values.reduce((accumulator, currentValue, currentIndex) => {
            return `${accumulator}${generateDieButton(variable, currentIndex, values)}
`;
        }, "")}
        </div>
    </div>
    `;
    }
    exports.generateDiceDropdown = generateDiceDropdown;
});
//# sourceMappingURL=templateUtils.js.map