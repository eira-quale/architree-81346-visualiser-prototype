<template>
    <div class="filter-dropdown" ref="dropdown">
        <div class="filter-top-row" @click="toggleDropdown">
            <span class="filter-text">
                Filter
                <span class="chevron">{{ isDropdownVisible ? '▲' : '▼' }}</span>
            </span>
            <div class="selected-tags" @click.stop>
                <span v-for="option in selectedOptions" :key="option.value" class="tag">
                    {{ option.label }}
                    <button class="remove-tag" @click="removeOption(option.value)">x</button>
                </span>
            </div>
        </div>
        <div v-if="isDropdownVisible" class="dropdown">
            <ul>
                <li>
                    <input type="checkbox" id="select-all" v-model="selectAll" @change="toggleSelectAll" />
                    <label for="select-all">Select All</label>
                </li>
                <li v-for="option in options" :key="option.value">
                    <input type="checkbox" :id="option.value" :value="option.value" v-model="selectedValues" />
                    <label :for="option.value">{{ option.label }}</label>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "FilterDropdown",
    data() {
        return {
            options: [
                { value: "bear", label: "Bear" },
                { value: "ant", label: "Ant" },
                { value: "salamander", label: "Salamander" },
                { value: "owl", label: "Owl" },
                { value: "frog", label: "Frog" },
                { value: "shark", label: "Shark" },
            ],
            selectedValues: [],
            selectAll: false,
            isDropdownVisible: false,
        };
    },
    computed: {
        selectedOptions() {
            return this.options.filter(option =>
                this.selectedValues.includes(option.value)
            );
        },
    },
    methods: {
        toggleDropdown() {
            this.isDropdownVisible = !this.isDropdownVisible;
        },
        closeDropdown() {
            this.isDropdownVisible = false;
        },
        toggleSelectAll() {
            if (this.selectAll) {
                this.selectedValues = this.options.map(option => option.value);
            } else {
                this.selectedValues = [];
            }
        },
        removeOption(value) {
            this.selectedValues = this.selectedValues.filter(v => v !== value);
            this.selectAll = false;
        },
        handleClickOutside(event) {
            if (!this.$refs.dropdown.contains(event.target) && !event.target.closest(".selected-tags")) {
                this.closeDropdown();
            }
        },
    },
    mounted() {
        document.addEventListener("click", this.handleClickOutside);
    },
    beforeDestroy() {
        document.removeEventListener("click", this.handleClickOutside);
    },
};
</script>

<style scoped>
.filter-dropdown {
    display: flex;
    flex-direction: column;
    margin: 10px 0;
    position: relative; /* Ensure positioning context for dropdown */
    max-width: 90%; /* Reduce the width to make it shorter on the right side */
}

.filter-top-row {
    display: flex;
    flex-direction: row;
    font-weight: bold;
    cursor: pointer;
    margin-bottom: 10px;
    height: 30px;
    border-bottom: 3px solid black;
    padding-bottom: 5px; /* Add space below the border */
}

.filter-text {
    margin-right: 10px;
    display: flex; /* Use flexbox for alignment */
    align-items: center; /* Center vertically */
    color: white;
    font-size: larger;
    background-color: #4a90e2; /* Add a background color */
    padding: 5px 10px; /* Add padding for button-like appearance */
    border-radius: 5px; /* Add rounded corners */
    cursor: pointer; /* Change cursor to pointer for interactivity */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
    transition: background-color 0.2s; /* Smooth transition for hover effect */
    
    
}

.filter-text:hover {
    background-color: #357ab8; /* Darken background on hover */
}

.selected-tags {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap; /* Prevent wrapping of tags */
    gap: 5px;
    
    
}

.tag {
    display: inline-flex; /* Use inline-flex to keep tag and button inline */
    align-items: center;
    background-color: #535bf2;
    color: white;
    padding: 5px 10px;
    border-radius: 15px;
    white-space: nowrap;
    /* Prevent text wrapping */
    margin-right: 5px; /* Add spacing between tags */
}

.remove-tag {
    background: none;
    border: none;
    color: white;
    margin-left: 5px; /* Add spacing between tag content and button */
    cursor: pointer;
    height: 100%; /* Match the height of the tag */
    display: flex; /* Use flexbox for centering */
    align-items: center; /* Center content vertically */
    justify-content: flex-end; /* Align the "x" to the right inside the button */
    padding: 0 5px; /* Add padding for better spacing */
}

.dropdown {
    position: absolute; /* Position on top of everything */
    z-index: 1000; /* Ensure it appears above other elements */
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    width: 120px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
    top: 100%; /* Position below the filter-top-row */
    left: 0;
}

.dropdown ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.dropdown li {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
}

label {
    margin-left: 5px;
}

input[type="checkbox"] {
    cursor: pointer;
}

.chevron {
    margin-left: 5px; /* Add spacing between text and chevron */
    font-size: smaller; /* Adjust size of the chevron */
}
</style>
