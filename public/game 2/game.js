let inventory = [];
let totalCatches = 0;

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function determineRarity() {
    const rand = Math.random() * 100;
    let cumulative = 0;
    
    for (const [rarity, chance] of Object.entries(rarityChances)) {
        cumulative += chance;
        if (rand <= cumulative) {
            return rarity;
        }
    }
    return 'common';
}

function catchFish() {
    const rarity = determineRarity();
    const fishList = fishData[rarity];
    const fish = fishList[Math.floor(Math.random() * fishList.length)];
    
    const [minWeight, maxWeight] = fish.weight.split('-').map(Number);
    const weight = (Math.random() * (maxWeight - minWeight) + minWeight).toFixed(1);
    
    return {
        name: fish.name,
        weight: weight,
        rarity: rarity
    };
}

function updateInventory(fish) {
    inventory.push(fish);
    totalCatches++;
    
    document.getElementById('totalCatches').textContent = totalCatches;
    
    const inventoryList = document.getElementById('inventoryList');
    const fishCard = document.createElement('div');
    fishCard.className = `fish-card ${fish.rarity}`;
    fishCard.innerHTML = `
        <span>${fish.name}</span>
        <span>${fish.weight} kg</span>
        <span>${fish.rarity.charAt(0).toUpperCase() + fish.rarity.slice(1)}</span>
    `;
    inventoryList.prepend(fishCard);
}

function displayCatchResult(fish) {
    const result = document.getElementById('result');
    result.innerHTML = `
        <h3>You caught a ${fish.name}!</h3>
        <p>Weight: ${fish.weight} kg</p>
        <p>Rarity: ${fish.rarity.charAt(0).toUpperCase() + fish.rarity.slice(1)}</p>
    `;
}

document.getElementById('fishButton').addEventListener('click', () => {
    const fish = catchFish();
    updateInventory(fish);
    displayCatchResult(fish);
}); 