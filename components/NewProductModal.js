import React,{Component} from 'react';
import
{
    Body,
    Container,
    Right,
    Text,
    CheckBox,
    List,
    ListItem,
    Fab,
    Icon,
    Form,
    Content,
    Input,
    Item,
    Button
    

} from 'native-base';
import{ StyleSheet,Alert,View} from 'react-native';
import Modal from 'react-native-modal';
import { ceil } from 'react-native-reanimated';

export default class NewProductModal extends Component{
    constructor(props){
        super(props);
        this.state={
            product:{},
            isVisible:false
        }
    }
    showModal(){
        this.setState({
            product:{id:Math.floor(Date.now())}
        })
        this.setState({
            isVisible:true
        })
    }
    hideModal=()=>{
        this.setState({
            isVisible:false
        })
    }
    render(){
        return(
            <Modal
            isVisible={this.state.isVisible}
            avoidKeyboard={true}
            onBackdropPress={this.hideModal.bind(this)}
           
            >
             <View  style={styles.modal}>
                 <Item style={styles.itemInput}>
                    <Input 
                    placeholder="Ten san pham"
                    onChangeText={text=>{
                        let newProduct=this.state.product;
                        newProduct.name=text;
                        this.setState({
                            product:newProduct
                        })
                    }}
                    value={this.state.product.name}
                    style={styles.input}
                    >
                    </Input>
                 </Item>
                 <Item style={styles.itemInput}>
                    <Input 
                    placeholder="Gia san pham"
                    onChangeText={text=>{
                        let newProduct=this.state.product;
                        newProduct.price=text;
                        this.setState({
                            product:newProduct
                        })
                    }}
                    value={this.state.product.price}
                    style={styles.input}
                    >
                    </Input>
                 </Item>
                 <Button block
                    style={styles.button}
                    onPress={()=>{
                        this.props.addNewProduct(this.state.product);
                        this.hideModal();
                    }}
                    >
                        <Text>Them san pham</Text>
                    </Button>
             </View>   
            </Modal>
        )
    }
}
const styles=StyleSheet.create({
    modal:{
        backgroundColor:'white',
        height:230,
        justifyContent:'center',
        alignItems:'center'

    },
    input:{
        marginHorizontal:10,
        paddingLeft:10,
        borderColor:'rgb(100,121,133)',
        borderWidth:1
    },
    itemInput:{
        marginTop:10
    },
    button:{
        marginHorizontal:10,
        backgroundColor:'rgb(16,33,48)',
        marginTop:20
    }
})