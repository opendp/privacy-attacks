function calculateTruthProbability(epsilon) {
    return Math.pow(Math.E, epsilon / Math.E) / (1 + Math.pow(Math.E, epsilon / Math.E));
}

function convertToPercentage(value) {
    if (value > 0.9999 && value < 1) {
        return "99.99";
    }
    if (value > 0 && value < 1e-2) {
        return value.toExponential(2);
    }
    return (value * 100).toFixed(2);
}

function convertToOdds(truthProbability, lieProbability) {
    const normalizedTruth = truthProbability / lieProbability;

    let approximatedTruth;
    if (Math.abs(normalizedTruth - 1) < 0.001) {
        // For values extremely close to 1:1, display exactly 1:1
        approximatedTruth = "1";
    } else if (Math.abs(normalizedTruth - 1) < 0.1) {
        // For values near 1:1 but not exactly 1, keep three decimal places
        approximatedTruth = normalizedTruth.toFixed(3);
    } else {
        // For other values, round to the nearest non-zero decimal
        approximatedTruth = Math.round(normalizedTruth * 10) / 10;
    }

    return `${approximatedTruth}:1`;
}

function loadProbabilityTable() {
    const epsilons = [0, 0.01, 0.1, 1, 5, 10, 50, 100];
    const tableBody = document.getElementById("probability-table-body");

    epsilons.forEach((epsilon) => {
        const probabilityOfTruth = calculateTruthProbability(epsilon);
        const probabilityOfLie = 1 - probabilityOfTruth;

        const truthPercentage = convertToPercentage(probabilityOfTruth);

        const oddsOfTruth = convertToOdds(probabilityOfTruth, probabilityOfLie);

        const row = document.createElement("tr");

        const epsilonCell = document.createElement("td");
        epsilonCell.textContent = epsilon;
        row.appendChild(epsilonCell);

        const probabilityTruthCell = document.createElement("td");
        probabilityTruthCell.textContent = `${truthPercentage}%`;
        row.appendChild(probabilityTruthCell);

        const oddsOfTruthCell = document.createElement("td");
        oddsOfTruthCell.textContent = oddsOfTruth;
        row.appendChild(oddsOfTruthCell);

        tableBody.appendChild(row);
    });
};

window.addEventListener("load", () => {
    loadProbabilityTable();
});