var vue = new Vue({
  el: '#app',
  components: {
    'modal':{
      name: 'modal',
      template:'<div class="modalHolder"><transition name="modal"><div class="modalShade" v-if="show && activeModal(condition)" v-on:click="close"><div class="modalContainer modalSize modal-sm modal-content" @click.stop><slot></slot></div></div></transition></div>',
      props: {
        show: {
          type: Boolean,
          required: true
        },
        onClose: {
          type: Function,
          required: true
        },
    		condition: {
    			type: String
    		}
      },
      methods:{
    		activeModal: function(condition){
    			if(condition==null){
    				return true
    			}
    			else{
    				return this.$parent.condition === condition
    			}
    		},
        close: function(){
          this.onClose()
        }
      }
    }
  },
  data: function(){
    return {
      showModalWindow: false,
      condition: null,
      collection: [
        {
          'name': 'item1',
          'content': 'itemContent1'
        },
        {
          'name':'item2',
          'content':'itemContent2'
        },
        {
          'name': 'item3',
          'content': 'itemContent3'
        },
        {
          'name':'item4',
          'content':'itemContent4'
        },
        {
          'name': 'item5',
          'content': 'itemContent5'
        },
        {
          'name':'item6',
          'content':'itemContent6'
        },
        {
          'name': 'item7',
          'content': 'itemContent7'
        },
        {
          'name':'item8',
          'content':'itemContent8'
        },
        {
          'name': 'item9',
          'content': 'itemContent9'
        },
        {
          'name':'item10',
          'content':'itemContent10'
        },
        {
          'name':'item11',
          'content':'itemContent11'
        }
      ],
      selectMode: null,
      selectedItem: null,
      selectedCollection: [],
      fitContent: {}
    }
  },
  methods: {
    'singleSelect': function(){
      var isMouseDown = false, isHighlighted
      var self = this
      $("#table tbody tr").on() //starts jQuery events
        .mousedown(function () {
          isMouseDown = true
          if($(this).hasClass('highlighted')){
            $(this).toggleClass('highlighted')
            self.selectedItem = null
            return false
          }
          else{
            $('#table tbody tr').each(function(){
              if($(this).hasClass('highlighted')){
                $(this).toggleClass('highlighted')
              }
            })
            $(this).toggleClass("highlighted")
            isHighlighted = $(this).hasClass("highlighted")
            self.selectedItem = $(this).attr('value')
            return false
          }
        })
        .mouseup(function () {
          isMouseDown = false
        })
        .bind("selectstart", function () {
          return false
        })
    },
    'multiSelect': function(){
      var isMouseDown = false, isHighlighted
    	var self = this
      $("#table tbody tr").on() //Starts jQuery events
    		.mousedown(function () {
    			isMouseDown = true
    			if($(this).hasClass('highlighted')){
    				$(this).toggleClass('highlighted')
    				var index = self.selectedCollection.indexOf($(this).attr("value"))
    				if(index > -1){
    					self.selectedCollection.splice(index, 1)
    				}
    				return false
    			}
    			else{
    				$(this).toggleClass("highlighted")
    				isHighlighted = $(this).hasClass("highlighted")
    				if(isHighlighted){
    					self.selectedCollection.push($(this).attr("value"))
    				}
    				return false
    			}
        })
        .mouseover(function () {
    			if(isMouseDown){
    				if($(this).hasClass('highlighted')){
    					$(this).toggleClass('highlighted')
    					var index = self.selectedCollection.indexOf($(this).attr("value"))
    					if(index > -1){
    						self.selectedCollection.splice(index, 1)
    					}
    				}
    				else{
    					$(this).toggleClass("highlighted", isHighlighted)
    					if(isHighlighted){
    						self.selectedCollection.push($(this).attr("value"))
    					}
    				}
          }
        })
        .mouseup(function () {
          isMouseDown = false
        })
        .bind("selectstart", function () {
          return false
        })
    },
    'openModal': function(){
      if(this.selectedItem!=null || this.selectedCollection.length>0){
        this.showModalWindow = true
      }
    },
    'close': function(){
      this.showModalWindow = false
      this.condition = null
    },
    'success':function(){
      $('#table tbody tr').each(function(){
        if($(this).hasClass('highlighted')){
          $(this).toggleClass('highlighted')
        }
      })
      this.resetSelection()
      this.showModalWindow = false
    },
    'resetSelection':function(){
      this.selectedItem = null
      this.selectedCollection.length = 0
    }
  },
  watch:{
    'selectMode':function(){
      this.resetSelection()
      $('#table tbody tr').each(function(){
					if($(this).hasClass('highlighted')){
						$(this).toggleClass('highlighted')
					}
				})
      $('#table tbody tr').off() //Resets jQuery events
      if(this.collection.length>10){
        this.fitContent = {
          block: 'block',
          scroll: 'scroll',
          scrollWidth: 'calc( 100% - 1.2em )',
          border: 'none',
          body: '380px'
        }
      }
      if(this.selectMode==0){
        this.singleSelect()
      }
      else{
        this.multiSelect()
      }
    }
  },
  created: function(){
    this.selectMode = 0
  }
})
