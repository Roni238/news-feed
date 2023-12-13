<template>
  <div class="wrapper">

    <header-vue>
      <search-posts/>
    </header-vue>

    <filters-bar/>

    <news-list/>

    <pager-counter/>
  </div>
</template>
<script>
import HeaderVue from '@/components/HeaderVue.vue'
import FiltersBar from '@/components/FiltersBar.vue';
import SearchPosts from '@/components/SearchPosts.vue';
import NewsList from '@/components/News/NewsList.vue';
import PagerCounter from '@/components/PagerCounter.vue';

export default {
  components:{
    HeaderVue,
    FiltersBar,
    SearchPosts,
    NewsList,
    PagerCounter
  },
  async fetch({ store }) {
    try {
      if(store.getters['postsModule/getPosts'].length === 0){
        await store.dispatch('postsModule/loadPost')
      }
    } catch (error) {
      console.error('Error in fetch:', error);
      throw error;
    }
  },
  mounted(){
    if(localStorage.getItem('tableStyle') !== null){
      this.$store.commit('postsModule/setTableStyle', localStorage.getItem('tableStyle') === "true");
    }
    if(this.$route.query.sourceFilters){
      this.$store.commit('postsModule/setSourceFilters', this.$route.query.sourceFilters)
    }
    if(this.$route.query.searchParams){
      this.$store.commit('postsModule/setSearchParams', this.$route.query.searchParams)
    }
    this.$store.commit('postsModule/setCurrentPage', this.$route.params.page || '1')
  },
}
</script>
<style>
body{
  background: #FBFBFB;
  margin: 0px;
  font-family: 'Arial', sans-serif;
}
.wrapper{
  width: 1060px;
  padding: 0px 20px;
  margin: auto;
  box-sizing: border-box;
}
@media screen and (max-width: 1080px) {
  .wrapper {
    width: 100%;
    min-width: 380px;
  }
}
@media screen and (max-width: 750px) {
  h1{
    font-size: 24px;
  }
}
</style>
