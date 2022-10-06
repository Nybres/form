const username = document.querySelector("#username");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");
const email = document.querySelector("#e-mail");
const btnClear = document.querySelector(".clear");
const btnSend = document.querySelector(".send");
const popup = document.querySelector(".popup");

const showError = (input, msg) => {
	const formBox = input.parentElement;
	const errorMsg = formBox.querySelector(".error-text");

	formBox.classList.add("error");
	errorMsg.textContent = msg;
};

const checkForm = input => {
	input.forEach(element => {
		if (element.value === "") {
			showError(element, element.placeholder);
		} else {
			clearError(element);
		}
	});
};

const clearError = input => {
	const formBox = input.parentElement;
	formBox.classList.remove("error");
};

const checkLength = (input, min) => {
	if (input.value.length < min) {
		showError(
			input,
			`${input.previousElementSibling.innerText.slice(
				0,
				-1
			)} składa sie z min. ${min} znaków.`
		);
	}
};

const checkEmail = email => {
	const reg =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (reg.test(email.value)) {
		clearError(email);
	} else {
		showError(email, "E-mail jest niepoprawny");
	}
};

const checkPassword = (pass1, pass2) => {
	if (pass1.value !== pass2.value) {
		showError(pass2, "Hasła do siebie nie pasują");
	}
};

const checkErrors = params => {
	const allInputs = document.querySelectorAll(".form-box");
	let errorCount = 0;

	allInputs.forEach(input => {
		if (input.classList.contains("error")) {
			errorCount++;
		}
	});

	if (errorCount === 0) {
		popup.classList.add("show-popup");
	}
};

btnClear.addEventListener("click", e => {
	e.preventDefault();

	[username, password, password2, email].forEach(element => {
		element.value = "";
		clearError(element);
	});
});

btnSend.addEventListener("click", e => {
	e.preventDefault();

	checkForm([username, password, password2, email]);
	checkLength(username, 3);
	checkLength(password, 8);
	checkPassword(password, password2);
	checkEmail(email);
	checkErrors();
});
