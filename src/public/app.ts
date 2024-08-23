const $card = document.querySelector("#card");

if ($card) {
    $card.addEventListener("click", async (event: Event) => {
        const target = event.target as HTMLElement;

        if (target.classList.contains("js-remove")) {
            const id = target.dataset.id;

            if (id) {
                try {
                    
                    const response = await fetch(`/card/remove/${id}`, {
                        method: "DELETE",
                    });

                    if (!response.ok) {
                        throw new Error(`Failed to remove course with ID: ${id}`);
                    }

                    const card = await response.json();
                    updateCard(card);

                } catch (error) {
                    console.error("Error with removing course:", error);
                }
            } else {
                console.log("ID not found in data attributes");
            }
        }
    });
}

function updateCard(card: { courses: any[], price: number }) {
    const cardElement = document.querySelector(".card");

    if (!cardElement) return;

    if (card.courses.length > 0) {
        const html = `
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Count</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${card.courses.map(c => `
                        <tr>
                            <td>${c.course.title}</td>
                            <td>${c.count}</td>
                            <td>
                                <button
                                    data-id="${c.course.id}"
                                    class="btn btn-small js-remove"
                                >Delete</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>

            <h4><strong>Price:</strong> <span class="price">${card.price}$</span></h4>
        `;
        cardElement.innerHTML = html;
    } else {
        cardElement.innerHTML = '<h1>Card is empty</h1>';
    }
}