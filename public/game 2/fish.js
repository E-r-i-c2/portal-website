const fishData = {
    common: [
        { name: "Anchovy", weight: "0.1-0.3" },
        { name: "Sardine", weight: "0.2-0.4" },
        { name: "Herring", weight: "0.3-0.6" },
        { name: "Mackerel", weight: "0.5-1.0" },
        { name: "Perch", weight: "0.4-0.8" },
        { name: "Bluegill", weight: "0.2-0.5" }
    ],
    uncommon: [
        { name: "Bass", weight: "1-3" },
        { name: "Trout", weight: "1-4" },
        { name: "Catfish", weight: "2-5" },
        { name: "Carp", weight: "2-6" },
        { name: "Pike", weight: "3-7" },
        { name: "Snapper", weight: "1-4" }
    ],
    rare: [
        { name: "Salmon", weight: "4-8" },
        { name: "Tuna", weight: "5-15" },
        { name: "Swordfish", weight: "10-30" },
        { name: "Halibut", weight: "8-20" },
        { name: "Mahi-mahi", weight: "5-15" },
        { name: "Grouper", weight: "5-12" }
    ],
    epic: [
        { name: "Giant Squid", weight: "20-50" },
        { name: "Marlin", weight: "40-80" },
        { name: "Sturgeon", weight: "30-60" },
        { name: "Shark", weight: "50-100" },
        { name: "Barracuda", weight: "15-30" },
        { name: "Octopus", weight: "10-25" }
    ],
    legendary: [
        { name: "Golden Tuna", weight: "100-200" },
        { name: "Rainbow Trout", weight: "20-30" },
        { name: "Crystal Bass", weight: "30-40" },
        { name: "Ancient Coelacanth", weight: "80-150" },
        { name: "Royal Salmon", weight: "40-60" },
        { name: "Dragon Fish", weight: "150-300" }
    ]
};

const rarityChances = {
    common: 50,
    uncommon: 25,
    rare: 15,
    epic: 7,
    legendary: 3
}; 