<template>
    <transition name="slide">
        <div class="modal" v-show="modalShow">
            <div class="mask"></div>
            <div class="modal-dialog">
                <div class="modal-header">
                    <span class="icon-close" @click="$emit('cancel')"></span>
                    {{title}}
                </div>
                <div class="modal-body">
                    <slot name="body"></slot>
                </div>

                <div class="modal-footer">
                        <a herf="javascript:;" class="btn" v-if="btnType==1" @click="$emit('submit')">{{sureText}}</a>
                        <a herf="javascript:;" class="btn btn-default" v-if="btnType==2" @click="$emit('cancel')">取消</a>
                    <div class="btn-group" v-if="btnType==3">
                        <a herf="javascript:;" class="btn" @click="$emit('submit')">确定</a>
                        <a herf="javascript:;" class="btn btn-default" @click="$emit('cancel')">取消</a>
                    </div>
                </div>
            </div>
        </div>
    </transition>   
</template>

<script>
export default {
    props:{
        modalType:{
            //弹框类型:小small、中middle、大large、表单form
            type:String,
            default:'form'
        },
        title:String,
        //按钮类型 1：确定按钮 2：取消按钮 3：确定取消
        btnType:String,
        sureText:{
            type:String,
            defalut:'确定'
        },
        cancelText:{
            type:String,
            defalut:'取消'
        },
        modalShow:Boolean
    }
}
</script>

<style lang="scss">
@import '../assets/scss/mixin.scss';
@import '../assets/scss/modal.scss'
</style>