<template>
  <div>
    <div class="margin">
      <el-input class="text" placeholder="请输入名称" suffix-icon="el-icon-search" v-model="name"></el-input>
      <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
      <el-button type="warning" @click="reset">重置</el-button>
    </div>
    <div class="margin">
      <el-carousel height="500px" :interval="10000">
        <el-carousel-item v-for="item in lun" :key="item.id">
          <a :href="item.link" target="_blank"><img :src="item.img" alt="" class="img"></a>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="margin">
      <div class="list">商品列表</div>
      <el-row :gutter="10">
        <el-col :span="6" v-for="item in goods" :key="item.id" class="bottom">
          <div class="goods" @click="$router.push('/front/detail?id=' + item.id)">
            <img :src="item.img" alt="" class="itemImg">
            <div class="line1">{{ item.name }}</div>
            <div class="line2">￥{{ item.price }} / {{ item.nums }}</div>
          </div>
        </el-col>
      </el-row>
      <div class="page">
        <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[4, 8, 12]"
            :page-size="pageSize"
            layout="total, prev, pager, next"
            :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FrontHome",
  data() {
    return {
      lun: [],
      goods: [],
      pageNum: 1,
      pageSize: 8,
      total: 0,
      name: "",
      records: []
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    //商品列表
    load() {
      this.request.get("/goods/front", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          name: this.name,
        }
      }).then(res => {
        this.goods = res.data.records
        this.total = res.data.total
      })
    },
    //分页相关
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum
      this.load()
    },
    //重置
    reset() {
      this.name = ""
      this.load()
    },
  }
}
</script>

<style scoped>
.margin {
  margin: 10px 0;
}

.text {
  width: 200px;
}

.img {
  width: 100%;
  height: 500px;
  overflow: hidden;
  border-radius: 10px;
}

.page {
  padding: 10px 0;
  background-color: white;
}

.list {
  margin: 20px 0;
  font-size: 20px;
  color: orangered;
  border-bottom: 1px solid orangered;
  padding-bottom: 10px;
}

.bottom {
  margin-bottom: 10px
}

.goods {
  background-color: white;
  padding: 10px;
  cursor: pointer;
}

.itemImg {
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 10px;
}

.line1 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #666;
  margin: 10px 0;
}

.line2 {
  margin: 10px 0;
  color: red;
  font-weight: bold;
  font-size: 14px;
}
</style>
