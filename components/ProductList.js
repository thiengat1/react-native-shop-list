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
    Content
    

} from 'native-base';
import{ StyleSheet,Alert,AsyncStorage} from 'react-native';
import  NewProductModal from './NewProductModal';

export default class ProductList extends Component{

    constructor(props){
        super(props);
        this.state={
            products:[
                {id:1,name:'Ao thun co lo',price:'100k'},
                {id:2,name:'Ao thun co trang',price:'100k'}
            ]
        };
    }
    async UNSAFE_componentWillMount(){
        const saveProducts=await AsyncStorage.getItem('@products');
        if(saveProducts){
            this.setState({
                products:JSON.parse(saveProducts) 
            })
        }
        else{
            this.setState({
                products:[]
            })
        }
    }
    handleCheckProduct(product)
    {
        this.state.products.forEach(p=>{
            if(product.id===p.id)
            {
                p.checked=!p.checked
            }
            return p
        })
        this.setState({
            products:this.state.products
        })
    }
    handleAddProduct(){
        this.refs.newProductModal.showModal()
    }

    handleDetailProduct(product)
    {
        this.props.navigation.navigate("DetailProduct",{
            product:product,
            updateProduct:this.updateProduct
        })
    }
    updateProduct=(product)=>
    {
        this.state.products.forEach(p=>{
            if(product.id===p.id)
            {
                p.name=product.name;
                p.price=product.price;
            }
            return p;
        })
        this.setState({
            products:this.state.products
        });
        AsyncStorage.setItem('@products',JSON.stringify(this.state.products));
    }
    addNewProduct=(newProduct)=>{
        this.setState({
            products:this.state.products.concat(newProduct)
        });
        AsyncStorage.setItem('@products',JSON.stringify(this.state.products.concat(newProduct)));
    }
    deleteProduct=()=>{
        var deleteIds=[];
        this.state.products.forEach(p=>{
            if(p.checked===true)
            {
                deleteIds.push(p.id)

            }
        })
        if(deleteIds.length===0)
        {
            alert('vui long chan item can xoa');
            return;
        }
        Alert.alert(`ban muon xoa ${deleteIds.length} san pham`,null,[
            {text:'Khong'},
            {text:'co',onPress:()=>{
                this.setState({
                    products:this.state.products.filter(p=>!p.checked)
                })
                AsyncStorage.setItem('@products',JSON.stringify(this.state.products));
            }}
        ])
    }
    render(){
        const {products}=this.state;
        return(
            <Container style={{backgroundColor:'rgb(210,230,239)'}}>
                <Content>
                    <List>
                        {products.map(item=>
                            <ListItem key={item.id} button onPress={this.handleDetailProduct.bind(this,item)}>
                                <Body>
                                    <Text style={styles.nameText}>{item.name}</Text>
                                    <Text style={styles.priceText}>Gia:{item.price}</Text>
                                </Body>
                                <Right>
                                    <CheckBox checked={item.checked} onPress={this.handleCheckProduct.bind(this,item)}/>
                                </Right>
                            </ListItem>
                            )}
                    </List>
                </Content>
                <Fab 
                position="bottomRight" 
                onPress={this.handleAddProduct.bind(this)}
                >
                    <Icon name="add"></Icon>
                </Fab>
                <Fab position="bottomLeft" 
                style={{backgroundColor:'red'}}
                onPress={this.deleteProduct}
                >
                    <Icon name="ios-remove"></Icon>
                </Fab>
            <NewProductModal 
            ref="newProductModal"
            addNewProduct={this.addNewProduct}
            
            />
            </Container>
        )
    }
}
const styles=StyleSheet.create({
    nameText:{
        marginHorizontal:10,
        fontWeight:'bold',
        fontSize:16
    },
    priceText:{
        marginHorizontal:10,
        fontSize:16,
        marginTop:10
    }
})