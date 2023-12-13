<template>
  <div class="page_counter">
    <span v-for="(page,index) in visiblePages" :key="index" :class="{currentPage: page == currentPage}" @click="changePage(page)">{{ page }}</span>
  </div>
</template>
<script>
export default {
  name:'pager-counter',
  computed:{
    sortedPost() {
      return this.$store.getters['postsModule/getSortedPost'];
    },
    postsInPage() {
      return this.$store.getters['postsModule/getPostsInPage'];
    },
    lastPage(){
      return Math.ceil(this.sortedPost.length/this.postsInPage)
    },
    currentPage(){
      return this.$store.getters['postsModule/getCurrentPage'];
    },
    visiblePages(){

      const pages = []
      const start = Math.max(1, this.currentPage - 2)
      const end = Math.min(this.lastPage, start + 5)

      //Добавляем первую страницу
      if(start >= 3){
        pages.push(1)
        pages.push('...')
      }
      for (let page = start; page <= end; page++) {
        pages.push(page);
      }
      //если последнний номер страницы из списка отображаемых не равен количеству страниц, тогда добавляем в конце последнюю страницу
      if(end != this.lastPage){
        //добавляем '...' перед последней страницей если между текущей страницей и последней больше 4х страниц
        if(this.currentPage != this.lastPage-4){
          pages.push('...')
        }
        pages.push(this.lastPage)
      }

      return pages;
    }
  },
  methods:{
    changePage(page) {
      if(page != '...'){
        this.$store.commit('postsModule/setCurrentPage', page)
        this.$router.push({ params: {  page }, query: { sourceFilters: this.$route.query.sourceFilters, searchParams:this.$route.query.searchParams}})
      }
    }
  }
}
</script>
<style scoped>
.currentPage{
  color: #0029FF;
}
.page_counter{
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 50px 0px 0px 0px;
}
span{
  cursor: pointer;
}
</style>
