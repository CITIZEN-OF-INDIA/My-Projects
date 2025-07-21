document.addEventListener("DOMContentLoaded", function () {
  const resourceTypes = ["Syllabus", "Notes", "Video"];
  const subjectCheckboxes = document.querySelectorAll(".subject-checkbox");

  subjectCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const subject = checkbox.value;
      const resourceDiv = document.getElementById("resources-" + subject);

      if (checkbox.checked) {
        resourceDiv.style.display = "block";
        resourceDiv.innerHTML = "";
        resourceTypes.forEach((res) => {
          const label = document.createElement("label");
          const input = document.createElement("input");
          input.type = "checkbox";
          input.name = `${subject}-resource`;
          input.value = res;
          label.appendChild(input);
          label.appendChild(document.createTextNode(" " + res));
          resourceDiv.appendChild(label);
        });
      } else {
        resourceDiv.style.display = "none";
        resourceDiv.innerHTML = "";
      }
    });
  });

  document.getElementById("submitBtn").addEventListener("click", function () {
    const resultArea = document.getElementById("resultArea");
    resultArea.innerHTML = "";

    let anySubjectSelected = false;

    subjectCheckboxes.forEach((subjectCheckbox) => {
      if (subjectCheckbox.checked) {
        anySubjectSelected = true;
        const subject = subjectCheckbox.value;
        const resourceInputs = document.querySelectorAll(`input[name="${subject}-resource"]:checked`);

        if (resourceInputs.length > 0) {
          resourceInputs.forEach((input) => {
            const div = document.createElement("div");
            div.textContent = `Working on ${input.value} for ${subject}... ✅`;
            resultArea.appendChild(div);
          });
        } else {
          const div = document.createElement("div");
          div.textContent = `No resources selected for ${subject}.`;
          resultArea.appendChild(div);
        }
      }
    });

    if (!anySubjectSelected) {
      resultArea.textContent = "Please select at least one subject.";
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  // Define resource types
  const resourceTypes = ["Syllabus", "Notes", "Video"];

  // Define resource links per subject
  const resourceLinks = {
    FCS: {
      Syllabus: "https://www.shiksha.com/engineering/btech-in-computer-science-engineering-syllabus-chp",
      Notes: "https://mrcet.com/downloads/digital_notes/HS/Programming%20for%20Problem%20Solving.pdf",
      Video: "https://youtu.be/DsK35f8wyUw?si=0Fz7pax9YzdneX1Y"
    },
    OP: {
      Syllabus: "",
      Notes: "https://example.com/op-notes.pdf",
      Video: "https://youtube.com/playlist?list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p&si=YXLAeQ255YBBBxyg"
    },
    CAO: {
      Syllabus: "https://example.com/cao-syllabus.pdf",
      Notes: "https://example.com/cao-notes.pdf",
      Video: "https://youtu.be/nezosHntjPg?si=3SlEoSL7hlJdr_gn"
    },
    Maths: {
      Syllabus: "https://example.com/maths-syllabus.pdf",
      Notes: "https://example.com/maths-notes.pdf",
      Video: "https://youtube.com/playlist?list=PLg2LVpcRrOF6-vZw95tkkBxbDQ1_Dwn_Y&si=la2KY6mH1Dj5urXv"
    },
    Physics: {
      Syllabus: "https://example.com/physics-syllabus.pdf",
      Notes: "https://example.com/physics-notes.pdf",
      Video: "https://youtube.com/playlist?list=PLg2LVpcRrOF5SHahQILs8jRZNOjqKBmbC&si=tjVXVYtDHPG6T7ps"
    },
    DAS: {
      Syllabus: "https://example.com/das-syllabus.pdf",
      Notes: "https:/",
      Video: "https://youtube.com/playlist?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&si=WclLTtB_dBZVh-Nq"
    },
    C: {
      Syllabus: "https://example.com/c-syllabus.pdf",
      Notes: "https://mrcet.com/downloads/digital_notes/HS/Programming%20for%20Problem%20Solving.pdf",
      Video: "https://youtube.com/watch?v=C_VIDEO_ID"
    },
    "C++": {
      Syllabus: "https://example.com/cpp-syllabus.pdf",
      Notes: "https://www.cet.edu.in/noticefiles/285_OOPS%20lecture%20notes%20Complete.pdf",
      Video: "https://youtu.be/mlIUKyZIUUU?si=W0g0fnCrTSJaDY7f"
    }
  };

  const subjectCheckboxes = document.querySelectorAll(".subject-checkbox");

  subjectCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const subject = checkbox.value;
      const resourceDiv = document.getElementById("resources-" + subject);

      if (checkbox.checked) {
        resourceDiv.style.display = "block";
        resourceDiv.innerHTML = "";
        resourceTypes.forEach((res) => {
          const label = document.createElement("label");
          const input = document.createElement("input");
          input.type = "checkbox";
          input.name = `${subject}-resource`;
          input.value = res;
          label.appendChild(input);
          label.appendChild(document.createTextNode(" " + res));
          resourceDiv.appendChild(label);
        });
      } else {
        resourceDiv.style.display = "none";
        resourceDiv.innerHTML = "";
      }
    });
  });

  document.getElementById("submitBtn").addEventListener("click", function () {
    const resultArea = document.getElementById("resultArea");
    resultArea.innerHTML = "";

    let anySubjectSelected = false;

    subjectCheckboxes.forEach((subjectCheckbox) => {
      if (subjectCheckbox.checked) {
        anySubjectSelected = true;
        const subject = subjectCheckbox.value;
        const resourceInputs = document.querySelectorAll(`input[name="${subject}-resource"]:checked`);

        if (resourceInputs.length > 0) {
          resourceInputs.forEach((input) => {
            const resourceName = input.value;
            const link = resourceLinks[subject]?.[resourceName];
            const div = document.createElement("div");

            if (link) {
              const anchor = document.createElement("a");
              anchor.href = link;
              anchor.target = "_blank";
              anchor.textContent = `${resourceName} for ${subject}`;
              div.appendChild(anchor);
            } else {
              div.textContent = `${resourceName} for ${subject} not available.`;
            }

            resultArea.appendChild(div);
          });
        } else {
          const div = document.createElement("div");
          div.textContent = `No resources selected for ${subject}.`;
          resultArea.appendChild(div);
        }
      }
    });

    if (!anySubjectSelected) {
      resultArea.textContent = "Please select at least one subject.";
    }
  });
});
