<template>
    <div class="pos-goods-props">
        <div class="goods-props-tips">
            如商品有其他销售时不影响售价的可选属性，可添加属性集，如未找到属性集，可在“商品属性”模块维护：
        </div>
        <div class="goods-props-choose">
            <span class="props-choose-label">选择属性集</span>
            <span class="props-choose-container">
                <span class="props-choose-item" v-for="(item,index) in selPropsShowList" :key="index">{{item.name}}</span>
            </span>
            <span class="add-more" @click="showMore">
                <img :src="addImg" alt="">
            </span>
        </div>
        <div class="more-props" v-show="showMoreFlag">
             <CheckboxGroup v-model="selPropsList">
                 <div v-for="tag in tagList" :key="tag.id">
                     <Checkbox :disabled="mode=='view'" class="more-props-item" :label="tag.id">{{tag.name}}</Checkbox>
                 </div>
            </CheckboxGroup>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        tagList: {
            default(){
                return []
            }
        },
        mode: {

        }
    },
    data(){
        return {
            addImg: require('@/assets/form-table-add.png'),
            showMoreFlag: true,
            selPropsList: [],
        }
    },
    computed: {
        selPropsShowList(){
            return  this.selPropsList.map(ele=>(this.tagList.find(it=>it.id == ele) || {}))
        }
    },
    methods: {
        showMore(){
            this.showMoreFlag = true
        },
        initVal(value){
            value = value || []
            this.selPropsList = value.map(ele=>{
                return ele.tag.id
            })
            console.log(this.selPropsList)
        }
    }
}
</script>
<style lang="scss" scoped>
.goods-props-tips{
    font-size:14px;
    color: #999999;
    line-height: 36px;
}
.goods-props-choose{
    height: 40px;
    line-height: 38px;
    box-sizing: border-box;
    padding-left: 22px;
    border: 1px solid #E5E5E5;
    width: 1120px;
    .props-choose-label{
        font-size:14px;
        color: #000;
    }
    .props-choose-item{
        margin-left: 20px;
        font-size: 14px;
        color: #0D9ECE;
        display: inline-block;
        vertical-align: middle;
        border: 1px solid #0D9ECE;
        line-height: 1.5;
        padding:0 8px;
        border-radius: 12px;
    }

}
.add-more{
    float: right;
    margin:5px 20px;
    cursor: pointer;

}
.more-props{
    width: 1120px;
    padding: 10px 20px;
     border: 1px solid #E5E5E5;
    overflow: hidden;
    .more-props-item{
        font-size: 14px;
        color: #666666;
        margin-bottom: 10px;
        /deep/ .ivu-checkbox-inner{
            margin-right: 10px;
        }
    }
}
</style>

