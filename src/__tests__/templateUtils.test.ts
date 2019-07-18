import { generateButton, repeatElements } from "./../templateUtils";

describe("Template Utils", () => {
    describe("repeatElements", () => {
        it("should return empty string if passed array is empty", () => {
            const givenTag = "td";
            const givenArray: number[] = [];
            const expectedResult = "";
            const result = repeatElements(givenTag, givenArray);
            expect(result).toBe(expectedResult);
        });
        it("should return numbers in the array surrounded by tags in each line", () => {
            const givenTag = "td";
            const givenArray: number[] = [1, 2, 3];
            const expectedResult = `<td>1</td>
<td>2</td>
<td>3</td>
`;
            const result = repeatElements(givenTag, givenArray);
            expect(result).toBe(expectedResult);
        });
        it("should return prefixed numbers in the array surrounded by tags in each line", () => {
            const givenTag = "td";
            const givenArray: number[] = [1, 2, 3];
            const givenPrefix = "Nr: ";
            const expectedResult = `<td>Nr: 1</td>
<td>Nr: 2</td>
<td>Nr: 3</td>
`;
            const result = repeatElements(givenTag, givenArray, givenPrefix);
            expect(result).toBe(expectedResult);
        });
        it("should return index for the numbers in the array surrounded by tags in each line", () => {
            const givenTag = "td";
            const givenArray: number[] = [4, 5, 6];
            const givenIndex = true;
            const expectedResult = `<td>1</td>
<td>2</td>
<td>3</td>
`;
            const result = repeatElements(givenTag, givenArray, "", givenIndex);
            expect(result).toBe(expectedResult);
        });
    });
    describe("generateButton", () => {
        it("should return a button with a given label", () => {
            const givenSubject = "test";
            const givenLabel = "Test";
            const givenCount = 5;
            const expectedResult = `<button
    class="w3-button w3-ripple w3-white w3-col"
    style="width:22%"
    onclick="send({
      subject: 'test',
      action: 'click',
      data: '5'
    })">
    Test
</button>
`;
            const result = generateButton(givenLabel, givenSubject, givenCount);
            expect(result).toBe(expectedResult);
        });
    });
});
