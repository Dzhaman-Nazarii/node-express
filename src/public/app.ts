const $card = document.querySelector("#card");
if ($card) {
    $card.addEventListener("click", (event: Event) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains("js-remove")) {
            const id = target.dataset.id;
            if (id) {
                console.log(`Attempting to remove course with ID: ${id}`);
                fetch(`/card/remove/${id}`, {
                    method: "DELETE"
                })
                .then((res) => res.json())
                .then((card) => {
                    console.log("Updated card:", card);
                })
                .catch((error) => {
                    console.error("Error with removing card:", error);
                });
            } else {
                console.log("ID not found in data attributes");
            }
        }
    });
}