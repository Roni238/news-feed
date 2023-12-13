<template>
    <div  :class="{'itemTable' : !isTableStyle,'itemList' : isTableStyle}">
      <div  :class="{'itemInfoTable' : !isTableStyle, 'itemInfoList' : isTableStyle}">

        <img :src="urlImg" :alt="this.post.link[0].split('/')[2]" v-if="isTableStyle">
        <div class="info">
          <a :href="this.post.link[0]">
            <h2> {{ title }} </h2>
          </a>
          <p> {{ description }} </p>
          <!-- <a :href="this.post.link[0]" v-if="!isTableStyle" class="link">Подробнее</a> -->
          <a :href="this.post.link[0]"  class="link">Подробнее</a>
        </div>
      </div>

      <div class="source">
        <a :href="sourceLink"> {{ this.post.link[0].split('/')[2] }} </a>
        <p> {{ pubData }} </p>
      </div>
    </div>

</template>
<script>
export default {
  name:'news-item',
  props:{
    post:{
      type:Object,
      require:true
    }
  },
  computed: {
    isTableStyle() {
      return !this.$store.getters['postsModule/getTableStyle'];
    },
    urlImg(){
      return this.post.enclosure?.[0]?.["$"]?.['url'] || '';
    },
    pubData(){
      const date = new Date(this.post.pubDate[0]);
      //форматируем время
      const formattedDate = date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      });
      return formattedDate
    },
    title(){
      let title = this.post.title[0].replace(/<br\s*\/?>/gi, '');
      title = title.replace(/<i\s*\/?>.*?<\/i\s*\/?>/gi, ''); //заметил в некоторыз тайтлах теги i и br, их нужно убрать
      return title
    },
    sourceLink(){
      return 'http://' + this.post.link[0].split('/')[2]
    },
    description(){
      return this.post.description[0]
    }
  }
}
</script>
<style scoped>
.link{
  display: none;
  text-decoration: underline;
}
  .itemInfoTable{
    height: 81%;
    display: flex;

    padding: 30px 30px 0px 30px
  }
  .itemTable{
    width: 100%;
    background: #FFF;
    margin-bottom: 20px;
    text-decoration: none;
    box-sizing: border-box;
    position: relative;
    box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.05);
  }
  .itemInfoList{
    display: flex;
    min-height: 203px;
    padding: 30px 30px 0px 30px
  }
  .itemList{
    position: relative;
    width: 100%;
    height: 256px;
    background: #FFF;
    margin-bottom: 20px;
    text-decoration: none;
    box-sizing: border-box;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.05);
  }

  h2{
    font-size: 18px;
    font-weight: 700;
    color: #0029FF;
    margin: 3px;
    text-decoration: none;
  }
  .info{


    p{
      color: #000;
    }
  }
  img{
    height: 100px;
    width: 200px;
  }
  .source{
    position: absolute;
    height: 28px;
    widows: 100%;
    font-size: 14px;
    font-weight: 400;
    background: #FCFCFC;
    display: flex;
    align-items: center;
    padding: 0px 30px;
    color: #DCDCDC;
    text-decoration: none;

    bottom: 0px;
    left: 0px;
    right: 0px;

    a{
      color: #DCDCDC;
      text-decoration: underline;
    }

  }
  a{

    text-decoration: none;
  }
  p{
    margin-left: auto;
    text-decoration: none;
  }
  @media screen and (max-width: 750px) {

    .itemList{
      display: block;
      height: 463px;
    }

    .itemInfoList{
      display: block;
    }
    img{
      height: 166px;
      width: 100%;
    }
    .info {
       margin-left: 0px;
    }
    .link{
      display: block;
    }
    .itemTable{
      min-height: 300px;
    }
  }
  @media screen and (min-width: 750px) {
    .itemTable a {
      display: block;
    }
    .itemTable{
      height: 300px;
    }
    .NewsItem{
      height: 246px;
    }
    .info{
      margin-left: 20px;
    }
  }
</style>
