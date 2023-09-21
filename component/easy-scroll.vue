<template>
    <view class="container">
        <view class="nav-list">
            <view class="nav-item"
                v-for="(item,index) of list" 
                :class="{active:index==viewNavIndex}"
                @click="handleClickNav(index)"
                :key="index">{{item.name}}</view>
        </view>
        <view class="list-wrapper">
            <scroll-view class="list-container" id="list-container"
                @scroll="handleListScroll"
                @touchstart="handleTouchScrollView"
                :scroll-y="true" 
                :scroll-into-view="'scroll-item-'+clickedNavIndex" 
                :show-scrollbar="false"
                :scroll-with-animation="true">
                <view class="list" v-for="(item,listIndex) of list" :key="listIndex" :id="'scroll-item-'+listIndex">
                    <view class="title"><text>{{item.name}}</text></view>
                    <view class="item-container" >
                        <view class="item" v-for="(sitem,index) in item.articles" :key="index" @click="itemClick(sitem)">
                            <view style="background-color: #dd524d;font-size: 28rpx;
							 margin:5px;padding: 5px;border-radius: 3px; color: #ffffff;">{{sitem.title}}</view>
                        </view>
                    </view>
                </view>
            </scroll-view> 
        </view>
    </view>
</template>

<script>
export default {
    name: 'easy-scroll',
    props:{
        topDistance:{
            type: Number,
            default:0
        },
		list:{
			type:Array,
			default:[]
		}
    },
    data() {
        return {
            isTouchScrollView: false,
            clickedNavIndex: 0,
            viewNavIndex: 0,
            nodeInfoList: [],
        }
    },
    methods:{
        init(){
            const query = uni.createSelectorQuery().in(this);
            query.selectAll('#list-container .list').boundingClientRect(data => {
                // console.log(data);
                this.nodeInfoList = data
            }).exec()
        },
        handleClickNav(nav){
            if(!this.isTouchScrollView&&this.clickedNavIndex == nav) return;
            // 锁定联动
            this.isTouchScrollView = false;
            // 解决clickedNavIndex相同触发更新失败
            if(this.clickedNavIndex == nav){
                this.clickedNavIndex = -1;
            }
            this.$nextTick(function(){
                this.clickedNavIndex = nav;
                this.viewNavIndex = nav
            })
        },
        handleListScroll(e){
            if(!this.isTouchScrollView) return;
            let scrollTop = this.scrollTop = e.detail.scrollTop;
            // console.log("scrollTop: " + scrollTop);
            let currentNavIndex = this.nodeInfoList.map((item,index)=>({index,...item}))
            .filter(item => item.top <= scrollTop + this.topDistance)
            .sort((a,b)=>b.top-a.top)[0].index;
            // console.log(currentNavIndex);
            this.viewNavIndex = currentNavIndex;
        },
        handleTouchScrollView(){
            this.isTouchScrollView = true;
        },
		itemClick(item){
			uni.navigateTo({
				url:'/pages/search/detail/detail?link=' + item.link + "&&title=" + item.title
			})
		}
    },
    mounted() {
        this.$nextTick(function(){
            this.init()
        })
		
    }
}
</script>

<style lang="stylus" scoped> 
.container
    display flex
    height calc(100vh - var(--window-top))
    .nav-list
        width: 200rpx;
        border-right: 2rpx solid #efefef;
        overflow-y auto
        overflow-x hidden
        display flex
        flex-direction column
        align-items center
        font-size 28rpx
        &::-webkit-scrollbar
            width 0
            height 0
            background transparent
        .nav-item
            width 100%
            padding 25rpx 0
            text-align center
            transition: transform .1s linear;
            &.active
                color: #dd524d
                transform-origin: center center;
                transform: scale(1.32);
			&.inactive
			    color: #ffffff
			    transform-origin: center center;
    .list-wrapper
        flex 1
        position relative
        .list-container
            position absolute
            top 0
            left 0
            right 0
            bottom 0
            padding 0 32rpx
            box-sizing border-box
            .title
                line-height 100rpx
                text-align left
            .item-container
                display flex
                flex-wrap wrap
                align-items center
                .item
                    text-align center
                    .name
                        font-size 25rpx
</style>
