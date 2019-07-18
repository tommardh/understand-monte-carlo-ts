export function repeatElements(tag: string, elements: number[], prefix: string = "", index = false) {
    return `${elements.reduce<string>((accumulator: string, currentValue: number, currentIndex: number) => {
        return `${accumulator}<${tag}>${prefix}${index ? currentIndex + 1 : currentValue}</${tag}>
`;
    }, "")}`;
}

export function generateButton(label: string, subject: string, value: number = 0) {
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

function generateDieButton(variable: string, value: number, values: number[]) {
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

export function generateDiceDropdown(variable: string, value: number, values: number[]) {
    return `<div class="w3-dropdown-hover w3-black">
        <button class="w3-button">
            <img
                src="die${value + 1}.svg"
                height="24px"
                width="24px" />
        </button>
        ${values[value]}
        <div class="w3-dropdown-content w3-bar-block w3-card-4">
            ${values.reduce<string>((accumulator: string, currentValue: number, currentIndex: number) => {
                  return `${accumulator}${generateDieButton(variable, currentIndex, values)}
`;
            }, "")}
        </div>
    </div>
    `;
}

