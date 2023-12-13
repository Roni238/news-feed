<template>
  <div class="filters">
    <div class="source">

      <span @click="updateSourceFilters('')"
       :class="{activeSource: sourceFilters === ''}"
      >Все</span>

      <span @click="updateSourceFilters('lenta.ru')"
       :class="{activeSource: sourceFilters === 'lenta.ru'}"
      >Lenta.ru</span>

      <span @click="updateSourceFilters('mos.ru')"
       :class="{activeSource: sourceFilters === 'mos.ru'}"
      >Mos.ru</span>

    </div>

    <div class="style">

      <svg width="18" height="18" viewBox="0 0 18 18" fill="#C4C4C4" @click="updateTableStyle(false)" :class="{activeTableStyle:!tableStyle}">
        <rect width="18" height="8"  />
        <rect y="10" width="18" height="8"/>
      </svg>

    <svg width="18" height="18" viewBox="0 0 18 18" fill="#C4C4C4" @click="updateTableStyle(true)" :class="{activeTableStyle:tableStyle}">
        <rect width="8" height="8"/>
        <rect y="10" width="8" height="8"/>
        <rect x="10" width="8" height="8"/>
        <rect x="10" y="10" width="8" height="8"/>
      </svg>

    </div>
  </div>
</template>
<script>
export default {
  name:'filters-bar',
  computed: {
    sourceFilters() {
      return this.$store.getters['postsModule/getSourceFilters'];
    },
    tableStyle() {
      return this.$store.getters['postsModule/getTableStyle'];
    }
  },
  methods: {
    updateSourceFilters(url) {
      this.$store.commit('postsModule/setSourceFilters', url);//меняем фильтры
      this.$router.push({
      params: { page: '1' },
      query: { sourceFilters: url, searchParams:this.$route.query.searchParams}
      })
    },
    updateTableStyle(newValue) {
      localStorage.setItem('tableStyle', newValue),
      this.$store.commit('postsModule/setTableStyle', newValue);
    }
  },
}
</script>
<style scoped>
.filters{
  height:70px;
  display:flex;
  justify-content: space-between;
  align-items: center;

  .source{
    font-size: 14px;
    padding: 1px;
    font-weight: 700;
    cursor: pointer;
    width: 160px;
    display: flex;
    justify-content: space-between;
  }
  .style{
    svg{
      margin-left: 10px;
      cursor: pointer;
    }
  }
}
span{
  color: #0029FF;
}
.activeSource {
  color: black;
}
.activeTableStyle{
  fill: #0029FF;
}
</style>
