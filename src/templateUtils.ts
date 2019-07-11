export function repeatElements(tag: string, elements: number[], prefix: string = "", index = false) {
    return `${elements.reduce<string>((accumulator: string, currentValue: number, currentIndex: number) => {
        return `${accumulator}<${tag}>${prefix}${index ? currentIndex + 1 : currentValue}</${tag}>
`;
    }, "")}`;
}

export function generateButton(label: string, subject: string, count: number) {
    return `<button
    class="w3-button w3-ripple w3-white w3-col"
    style="width:22%"
    onclick="send({
      subject: '${subject}',
      action: 'click',
      data: {counter: ${count}}
    })">
    ${label}
</button>
`;
}
