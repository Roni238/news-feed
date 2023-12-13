import { GetterTree, MutationTree, ActionTree } from 'vuex';
import PostService from '@/service/PostService';

interface Post {
  title: string[],
  description: string[],
  pubDate: string[],
  link: string[]
}

interface State {
  tableStyle: boolean,
  posts: Post[],
  postsInPage:number,
  currentPage:number,
  sourceFilters:string,
  searchParams:string,
}

export const state = (): State => ({
  tableStyle:true,
  posts:[],
  postsInPage:4,
  currentPage:1,
  sourceFilters:'',
  searchParams:''
});

export const getters: GetterTree<State, any> = {
  getTableStyle: (state) => state.tableStyle,
  getPosts: (state) => state.posts,
  getPostsInPage:(state) => state.postsInPage,
  getCurrentPage:(state) => state.currentPage,
  getSourceFilters:(state) => state.sourceFilters,
  getSearchParams:(state) => state.searchParams,
  getSortedPost: (state) => {
    //проверяем наличие фильтра, потом проверяем есть ли параметры в фильтре, если нет ни того ни другого возвращаем стейт
    const postsWithFilter = state.sourceFilters
      ? state.posts.filter(post => post?.link[0].split('/')[2].toLowerCase().includes(state.sourceFilters.toLowerCase()))
      : state.posts

    const searchedPostsWithFilter = state.searchParams
      ? postsWithFilter.filter(post => post?.title[0].toLowerCase().includes(state.searchParams.toLowerCase()))
      : postsWithFilter

    return searchedPostsWithFilter
  },
};

export const mutations: MutationTree<State> = {
  setCurrentPage(state,value){state.currentPage=value},
  setSourceFilters(state,value){state.sourceFilters=value},
  setSearchParams(state,value){state.searchParams=value},
  setPosts(state,value){state.posts=value},
  setTableStyle(state, value) {
    state.postsInPage = value?4:3
    state.tableStyle = value;
  },
};

export const actions: ActionTree<State, any> = {
  async loadPost(store){
    const mosPosts = await PostService.loadPosts('/api/mos')
    const lentaPosts = await PostService.loadPosts('/api/lenta')
    store.commit('setPosts', [...mosPosts,...lentaPosts])
  }
}
