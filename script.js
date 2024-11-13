document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll("nav ul li a");
    const bookingHistory = [];

    // Handle page navigation
    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const page = link.getAttribute("href").slice(1);
            showPage(page);
        });
    });

    function showPage(page) {
        const pages = document.querySelectorAll(".page");
        pages.forEach(p => p.style.display = "none");
        const activePage = document.getElementById(page);
        if (activePage) {
            activePage.style.display = "block";
        }
    }

    // Default page view
    showPage("home");

    // Booking form submission
    const bookingForm = document.getElementById("booking-form");
    bookingForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const bookingId = `FL${Math.floor(Math.random() * 1000) + 100}`;
        const fromCity = document.getElementById("from-city").value;
        const toCity = document.getElementById("to-city").value;
        const passengers = document.getElementById("passengers").value;
        const travelDate = document.getElementById("travel-date").value;
        const seat = document.getElementById("seat-selection").value;
        const meal = document.getElementById("meal-preference").value;

        bookingHistory.push({ id: bookingId, fromCity, toCity, passengers, travelDate, seat, meal });
        
        const flightInfo = document.getElementById("flight-info");
        flightInfo.textContent = `Booking ID: ${bookingId} - Flight from ${fromCity} to ${toCity} for ${passengers} passenger(s) on ${travelDate}, Seat: ${seat}, Meal: ${meal}.`;
        showPage("flight-details");

        // Call prediction functions after booking
        predictPrice(fromCity, toCity, passengers, travelDate);
        provideCustomerInsights(fromCity, toCity);
        offerTravelRecommendations(fromCity, toCity);
    });

    // Price Prediction function
     function predictPrice(fromCity, toCity, passengers, travelDate) {
        // Dummy price prediction logic (This can be expanded with real prediction models)
        const basePrice = 100;
        const priceFactor = (fromCity === "New York" && toCity === "London") ? 1.5 : 1.2;
        const passengerFactor = passengers > 2 ? 1.1 : 1;
        const totalPrice = basePrice * priceFactor * passengerFactor;

        const priceElement = document.getElementById("predicted-price");
        priceElement.textContent = `Predicted Price for flight from ${fromCity} to ${toCity}: $${totalPrice.toFixed(2)}`;
    }

    // Customer Insights function
    function provideCustomerInsights(fromCity, toCity) {
        // Dummy customer insights logic (This can be extended with real data and insights)
        const insights = {
            "New York to London": "Popular among business travelers. High demand during the summer season.",
            "Tokyo to Paris": "Common route for tourists. Offers competitive flight deals during off-peak months.",
            "Los Angeles to Sydney": "Often booked for vacations. Best deals found 3 months in advance."
        };

        const insightText = insights[`${fromCity} to ${toCity}`] || "Check availability for this route.";
        const insightElement = document.getElementById("customer-insights");
        insightElement.textContent = `Customer Insight: ${insightText}`;
    }

    // Travel Recommendations function
    function offerTravelRecommendations(fromCity, toCity) {
        // Dummy travel recommendation logic (This can be expanded with real recommendation algorithms)
        const recommendations = {
            "New York to London": ["Visit the British Museum", "Take a tour of Buckingham Palace"],
            "Tokyo to Paris": ["Visit the Eiffel Tower", "Explore Montmartre"],
            "Los Angeles to Sydney": ["Visit the Opera House", "Relax on Bondi Beach"]
        };

        const recommendedPlaces = recommendations[`${fromCity} to ${toCity}`] || ["Explore the city and enjoy the local cuisine."];
        const recommendationsElement = document.getElementById("travel-recommendations");
        recommendationsElement.innerHTML = "<strong>Travel Recommendations:</strong><ul>" +
            recommendedPlaces.map(place => `<li>${place}</li>`).join("") +
            "</ul>";
    }
    
    // Confirmation
    const confirmButton = document.createElement("button");
    confirmButton.id = "confirm-booking";
    confirmButton.textContent = "Confirm Booking";
    document.getElementById("flight-details").appendChild(confirmButton);

    confirmButton.addEventListener("click", function () {
        document.getElementById("confirmation-message").textContent = "Your flight has been successfully booked!";
        showPage("confirmation");
    });

    // Track booking with dummy flight statuses
    const dummyFlights = {
        "FL100": { status: "Boarded", details: "Flight has boarded and is ready for takeoff." },
        "FL200": { status: "Late", details: "Flight is delayed by 30 minutes." },
        "FL300": { status: "Landed", details: "Flight has landed on time." }
    };

    const trackBookingForm = document.getElementById("track-booking-form");
    trackBookingForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const bookingId = document.getElementById("booking-id").value.toUpperCase();
        const statusPage = document.getElementById("track-booking-status");
        statusPage.innerHTML = ""; // Clear previous results

        const booking = bookingHistory.find(b => b.id === bookingId);
        const dummyFlight = dummyFlights[bookingId];

        if (booking) {
            statusPage.innerHTML = `Booking ID: ${bookingId} - Flight from ${booking.fromCity} to ${booking.toCity}, Seat: ${booking.seat}, Meal: ${booking.meal}.`;
        } else if (dummyFlight) {
            statusPage.innerHTML = `<h3>Status:</h3> ${dummyFlight.status} - ${dummyFlight.details}`;
        } else {
            statusPage.innerHTML = "Booking not found.";
        }
        showPage("track-booking-status");
    });

    // View booking history
    const viewHistoryButton = document.getElementById("view-history");
    viewHistoryButton.addEventListener("click", function () {
        const historyList = document.getElementById("booking-history");
        historyList.innerHTML = ""; // Clear previous content

        if (bookingHistory.length > 0) {
            bookingHistory.forEach(booking => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                    <strong>Booking ID:</strong> ${booking.id} <br>
                    <strong>From:</strong> ${booking.fromCity} <br>
                    <strong>To:</strong> ${booking.toCity} <br>
                    <strong>Date:</strong> ${booking.travelDate} <br>
                    <strong>Seat:</strong> ${booking.seat} <br>
                    <strong>Meal:</strong> ${booking.meal}
                `;
                historyList.appendChild(listItem);
            });
        } else {
            historyList.innerHTML = "<li>No bookings found.</li>";
        }
    });

    // Cancel booking
    const cancelBookingForm = document.getElementById("cancel-booking-form");
    cancelBookingForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const cancelId = document.getElementById("cancel-booking-id").value;
        const index = bookingHistory.findIndex(b => b.id === cancelId);

        if (index !== -1) {
            bookingHistory.splice(index, 1);
            document.getElementById("cancel-message").textContent = `Booking ID ${cancelId} has been successfully canceled.`;
        } else {
            document.getElementById("cancel-message").textContent = "Booking not found.";
        }
    });
});
