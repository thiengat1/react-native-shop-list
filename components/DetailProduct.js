import React,{Component} from 'react';

import {Container,Text, Content, Item,Input,Button} from 'native-base';
import {StyleSheet} from 'react-native';

export default class DetailProduct extends Component{
    constructor(props){
        super(props);
      this.state={
          product:this.props.route.params.product
      }
} 
    render(){
        const{updateProduct}=this.props.route.params
        return(
            <Container>
                <Content>
                    <Item style={styles.itemInput}>
                        <Input 
                        placeholder="Ten san pham"
                        onChangeText={text=>{
                            let updateProduct=this.state.product;
                            updateProduct.name=text;
                            this.setState({
                                product:updateProduct
                            })
                        }}
                        value={this.state.product.name}
                        style={styles.input}
                        />
                        
                    </Item>
                    <Item style={styles.itemInput}>
                        <Input 
                        placeholder="Gia san pham"
                        onChangeText={text=>{
                            let updateProduct=this.state.product;
                            updateProduct.price=text;
                            this.setState({
                                product:updateProduct
                            })
                        }}
                        value={this.state.product.price}
                        style={styles.input}
                        />
                        
                    </Item>
                    <Button block
                    style={styles.button}
                    onPress={()=>
                       {
                        updateProduct(this.state.product)
                        this.props.navigation.goBack();
                       }
                        
                    }
                    >
                        <Text>Luu san pham</Text>
                    </Button>
                </Content>
            </Container>
        )
    }

}
const styles=StyleSheet.create({
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