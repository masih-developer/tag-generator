const $ = document;
const list = $.querySelector("ul");
const input = $.querySelector("input");
const remainingTags = $.querySelector(".details p");
const removeAllBtn = $.querySelector(".details button");

let allTags = [];
let maximumTags = 10;

const removeAllTags = () => {
    list.querySelectorAll("li").forEach((tag) => tag.remove());
};

const generateTag = () => {
    removeAllTags();
    [...allTags].reverse().forEach((item) => {
        list.insertAdjacentHTML(
            "afterbegin",
            `
                <li>
                    ${item}
                    <i class="uit uit-multiply" onclick="removeTagHandler('${item}')"></i>
                </li>
            `
        );
    });
};

const removeTagHandler = (tagName) => {
    allTags.splice(allTags.indexOf(tagName), 1);
    removeAllTags();
    generateTag();
    calculatingTagCount();
};

const calculatingTagCount = () => {
    remainingTags.innerHTML = `${maximumTags - allTags.length} tags are remaining`;
};

input.addEventListener("keyup", (e) => {
    let inputValue = input.value.toLowerCase();
    if (e.key === "Enter" && inputValue.trim() !== "") {
        if (allTags.length < maximumTags) {
            if (!allTags.includes(inputValue)) {
                if (inputValue.includes(",")) {
                    inputValue.split(",").forEach((item) => {
                        if (allTags.length < maximumTags) {
                            if (!allTags.includes(item)) {
                                allTags.push(item);
                                generateTag();
                            }
                        }
                    });
                    input.value = "";
                    calculatingTagCount();
                } else {
                    allTags.push(inputValue);
                    generateTag();
                    input.value = "";
                    calculatingTagCount();
                }
            }
        }
    }
});

removeAllBtn.addEventListener("click", () => {
    allTags = [];
    removeAllTags();
    calculatingTagCount();
});

window.addEventListener("load", () => {
    generateTag();
    calculatingTagCount();
});
