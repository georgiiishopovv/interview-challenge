<script lang="ts" setup>

    import {defineProps} from 'vue';

    const props = defineProps({
        currentPage: {
            type : Number,
            required: true
        },
        totalPages: {
            type: Number,
            required: true
        }
    });

    const emit = defineEmits(['page-changed']);

    //Notify a page change to refresh the posts
    function change(page: number)
    {
        if(page >= 1 && page <= props.totalPages) emit('page-changed', page);
    }

    //Generate neighbors for each current page
    function generatePages(){
        let pages : (number | string)[] = [];

        pages.push(1);
        if(props.totalPages > 2) pages.push(2);
        if(props.currentPage > 6) pages.push('...')

        let start = Math.max(3, props.currentPage - 2);
        let end = Math.min(props.currentPage + 2, props.totalPages-2);

        if(props.currentPage == 6) start-=1 
        if(props.currentPage == props.totalPages - 5) end+=1;
        
        for(let i = start; i <= end; i++) pages.push(i);

        if(props.currentPage <= props.totalPages - 6) pages.push('...');
        pages.push(props.totalPages - 1);
        pages.push(props.totalPages);
        return pages;
    }

</script>

<template>
    <div class="pagination">
         <!-- Pagination using buttons to enable keyboard navigation -->
        <button @click="change(props.currentPage-1)">Prev</button>
        <button class="num-btn" v-for="page in generatePages()" :key="page"
            @click = "change(page)" 
            :class="{'active': page === props.currentPage, 'non-clickable': page === '...'}"
        >
            {{page}}
        </button>
        <button @click="change(props.currentPage+1)">Next</button>
    </div>
</template>

<style scoped>

    .pagination {
        display: flex;
        justify-content: center;
        gap: 0.4rem;
        margin-top: 2rem;
        }

    .pagination button{
        cursor: pointer;
    }

    .pagination .num-btn{
        background-color: transparent;
        border: none;
        padding: 0;
        font-size: 1rem;
        }

    .pagination button.active {
        color: red;
        }

    .pagination button.non-clickable{
        cursor: default;
        pointer-events: none;
        }

</style>