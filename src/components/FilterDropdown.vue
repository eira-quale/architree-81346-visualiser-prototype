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
            <input
                type="checkbox"
                :id="option.value"
                :value="option.value"
                v-model="selectedValues"
                />
            <label :for="option.value">{{ option.label }}</label>
            </li>
        </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "FilterDropdown",
    props: {
        dynamicOptions: {
        type: Array,
        required: true,
        },
    },
    data() {
        return {
            options: [],
            selectedValues: [],
            selectAll: false,
            isDropdownVisible: false,
        };
    },
    computed: {
        selectedOptions() {
            return this.options.filter((option) =>
            this.selectedValues.includes(option.value)
        );
        },
    },
    watch: {
        selectedValues(newVal) {
            this.selectAll = newVal.length === this.options.length;
            this.$emit("filter-changed", newVal);
        },
        dynamicOptions: {
            immediate: true,
            handler(newVal) {
                this.options = newVal;
                this.selectedValues = newVal.map(opt => opt.value);
                this.selectAll = true;
                this.$emit("filter-changed", this.selectedValues);
            },
        }
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
                this.selectedValues = this.options.map((option) => option.value);
            } else {
                this.selectedValues = [];
            }
        },
        removeOption(value) {
            this.selectedValues = this.selectedValues.filter((v) => v !== value);
            this.selectAll = false;
        },
        handleClickOutside(event) {
            if (
            !this.$refs.dropdown.contains(event.target) &&
            !event.target.closest(".selected-tags")
            ) {
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

</style>