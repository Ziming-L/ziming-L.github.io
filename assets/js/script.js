// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

window.addEventListener("resize", function () {
	if (window.innerWidth >= 1024) {
		sidebar.classList.remove("active");
	}
});

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
	formInputs[i].addEventListener("input", function () {
		// check form validation
		if (form.checkValidity()) {
			formBtn.removeAttribute("disabled");
		} else {
			formBtn.setAttribute("disabled", "");
		}

	});
}

const alertBox = document.getElementById("custom-alert");

function showAlert(message, type = "success") {
	alertBox.textContent = message;
	alertBox.className = `custom-alert ${type} show`;

	// hide after 3 seconds
	setTimeout(() => {
		alertBox.className = `custom-alert ${type} hide`;
		setTimeout(() => (alertBox.style.display = "none"), 300);
	}, 3000);
}


form.addEventListener("submit", function (e) {
	e.preventDefault();
	const localTime = new Date().toLocaleString(undefined, {
		dateStyle: "medium",
		timeStyle: "medium"
	});

	emailjs.send("service_xwe2h22", "template_bth0qu3", {
		from_name: form.fullname.value,
		from_email: form.email.value,
		message: form.message.value,
		time: localTime
	})
	.then(() => {
		showAlert("Message sent successfully!", "success");
		form.reset();
	})
	.catch((error) => {
		showAlert("Failed to send message.", "error");
		console.error("EmailJS error:", error);
	});
});


// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
	navigationLinks[i].addEventListener("click", function () {
		for (let i = 0; i < pages.length; i++) {
			if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
				pages[i].classList.add("active");
				navigationLinks[i].classList.add("active");
				window.scrollTo(0, 0);
			} else {
				pages[i].classList.remove("active");
				navigationLinks[i].classList.remove("active");
			}
		}
	});
}