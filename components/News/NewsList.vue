<template>
  <div :class="{list : this.$store.getters['postsModule/getTableStyle'] }">
    <news-item v-for="(post, index) in paginatedPosts" :post="post" :key="index"/>
    <h1 v-if="this.$store.getters['postsModule/getPosts'].length===0">Загрузка</h1>
    <h1 v-if="sortedPost.length===0 && this.$store.getters['postsModule/getPosts'].length>0">Посты не найдены!</h1>
  </div>
</template>
<script>
import NewsItem from '@/components/News/NewsItem.vue';

export default {
  name:'news-list',
  components:{
    NewsItem
  },
  computed: {
    sortedPost() {
      return this.$store.getters['postsModule/getSortedPost'];
    },
    currentPage() {
      return this.$store.getters['postsModule/getCurrentPage'];
    },
    postsInPage() {
      return this.$store.getters['postsModule/getPostsInPage'];
    },
    paginatedPosts() {
      // сколько постов отображать на странице
      const start = (this.currentPage - 1) * this.postsInPage;
      const end = start + this.postsInPage;
      return this.sortedPost.slice(start, end);
    },
    getLastPage(){
      return Math.ceil(this.sortedPost.length/this.$store.getters['postsModule/getPostsInPage'])
    }
  },
  mounted(){
    if(this.$route.params.page<1){
      this.$router.push({params:{page:'1'}})
    }
  }
}
</script>
<style>
  .list{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  @media screen and (max-width: 750px) {
    .list{
      grid-template-columns: 1fr ;
    }
  }
</style>
