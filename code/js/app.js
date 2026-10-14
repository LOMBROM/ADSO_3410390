document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // MENÚ DE NAVEGACIÓN
    // =========================

    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    const navItems = document.querySelectorAll(".nav-link");

    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Cerrar menú" : "Abrir menú"
        );
    });

    navItems.forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");

            navItems.forEach((item) => {
                item.classList.remove("active");
            });

            link.classList.add("active");
        });
    });

    // =========================
    // DESPLAZAMIENTO DE RANGOS
    // =========================

    const ranksContainer = document.getElementById("ranks-container");
    const prevButton = document.querySelector(".rank-prev");
    const nextButton = document.querySelector(".rank-next");

    const scrollAmount = () => {
        return Math.max(ranksContainer.clientWidth * 0.7, 150);
    };

    prevButton.addEventListener("click", () => {
        ranksContainer.scrollBy({
            left: -scrollAmount(),
            behavior: "smooth"
        });
    });

    nextButton.addEventListener("click", () => {
        ranksContainer.scrollBy({
            left: scrollAmount(),
            behavior: "smooth"
        });
    });

    // =========================
    // SELECTOR DE TEMPORADA
    // =========================

    const seasonSelect = document.getElementById("season-select");
    const seasonStatus = document.getElementById("season-status");

    seasonSelect.addEventListener("change", () => {
        const selectedSeason = seasonSelect.value;

        if (selectedSeason === "TEMPORADA") {
            seasonStatus.textContent = "";
        } else {
            seasonStatus.textContent =
                "Temporada seleccionada: " + selectedSeason;
        }
    });

    // =========================
    // NAVEGACIÓN ACTIVA AL HACER SCROLL
    // =========================

    const sections = document.querySelectorAll(
        "#eventos, #rangos, #meta, #mapa"
    );

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;

                    navItems.forEach((link) => {
                        const isActive =
                            link.getAttribute("href") === "#" + sectionId;

                        link.classList.toggle("active", isActive);
                    });
                }
            });
        },
        {
            rootMargin: "-20% 0px -65% 0px",
            threshold: 0
        }
    );

    sections.forEach((section) => observer.observe(section));

});