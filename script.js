const passwordList = document.getElementById("passwordList");

const dialog = document.getElementById("dialog");

let passwords = [
    // {username: "user1", password: "admin123"},
];

const passwordsFromLocalStorate = JSON.parse(localStorage.getItem("passwords"));

if (passwordsFromLocalStorate) {
    passwords = passwordsFromLocalStorate;
    displayPasswords();
}

function multiplyChar(char, count) {
    let res = '';
    for (let i = 0; i < count; i++) {
        res += char;
    }

    return res;
}

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}


function displayPasswords() {
    passwordList.innerHTML = "";
    passwords.forEach((record, index) => {
        console.log(123);
        const passwordDiv = document.createElement("div");
        passwordDiv.classList.add("password-div");
        passwordDiv.innerHTML = '<b>' + record.username + ' | ' + multiplyChar('*', record.password.length) + '</b>';
        
        const copyButton = document.createElement("button");
        copyButton.classList.add("copy-button");

        const i_with_icon = document.createElement("i");
        i_with_icon.classList.add("fa");
        i_with_icon.classList.add("fa-clipboard");
        copyButton.appendChild(i_with_icon);

        copyButton.addEventListener("click", () => {
            copyToClipboard(record.password);
            copyButton.innerHTML = "Pass copied to clipboard";
            copyButton.style.fontSize = "10px";
            setTimeout(() => {
                copyButton.innerHTML = "";
                copyButton.appendChild(i_with_icon);
                copyButton.style.fontSize = "inherit";
            }, 1000);
        });
        
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            passwords.splice(index, 1);
            displayPasswords();
        });
        
        passwordDiv.appendChild(copyButton);
        passwordDiv.appendChild(deleteButton);
        passwordList.appendChild(passwordDiv);
    });
}

document.getElementById("addPasswordButton").addEventListener("click", () => {
    dialog.style.display = "block";
    
});

let username_input = document.getElementById("username");
let password_input = document.getElementById("password");

document.getElementById("addButton").addEventListener("click", () => {
    if (username_input.value != "" && password_input.value != "") {
        passwords.push({username: username_input.value, password: password_input.value});
        localStorage.setItem("passwords", JSON.stringify(passwords));

        username_input.value = "";
        password_input.value = "";
        
        dialog.style.display = "none";
        displayPasswords();
    }
})

document.getElementById("closeButton").addEventListener("click", () => {
    username_input.value = "";
    password_input.value = "";
    dialog.style.display = "none";
})

dialog.style.display = "none";
