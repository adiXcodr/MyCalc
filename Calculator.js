import * as React from 'react';
import {Text, View,FlatList,Dimensions,TouchableOpacity ,SafeAreaView} from 'react-native';
import {Paragraph,IconButton,Card} from 'react-native-paper';
import {evaluate} from 'mathjs';

export default class CalculatorComponent extends React.Component {

  state={
      screen:'',
      numbers:[]
  }

  performOperation(){
    let screen=this.state.screen;
    let output='';
    try{
      output=evaluate(screen);
    }
    catch(err){
      console.log(err);
      output='Error!'
    }
    console.log(output)
    this.setState({
      screen:output
    });
  }

  updateScreen(value){
    let screen=this.state.screen;
    if(screen=='null'){
      screen=value;
    }
    else{
      screen=screen+value;
    }
    
    this.setState({
      screen:screen
    });
  }

  doBackspace(){
    let screen=this.state.screen;
    if(screen!='null'){
      screen=screen.slice(0,screen.length-1);
    }
    if(screen==''){
      screen='null'
    }
    this.setState({
      screen:screen
    });
  }

  setInitialState(){
    let numbers=[
      {id:1,title:'1'},
      {id:2,title:'2'},
      {id:3,title:'3'},
      {id:4,title:'4'},
      {id:5,title:'5'},
      {id:6,title:'6'},
      {id:7,title:'7'},
      {id:8,title:'8'},
      {id:9,title:'9'},
      {id:10,title:'0'},
      {id:11,title:'+'},
      {id:12,title:'-'},
      {id:13,title:'*'},
      {id:14,title:'/'},
      {id:15,title:'='},
    ]
    this.setState({
      screen:'null',
      numbers:numbers
    });
  }

  componentDidMount(){
    this.setInitialState();
  }
  
  render(){
    const numbers=this.state.numbers;
    return (
      <SafeAreaView style={{width:'90%',alignSelf:'center'}}>
        
          <View style={{marginHorizontal:'1%',marginVertical:20}}>
            <Paragraph style={{fontSize:20,fontWeight:'700',color:'orange',marginTop:40,width:'100%'}}>MyCalc</Paragraph>
          </View>

      
          <Card elevation={3} style={{marginVertical:40,paddingHorizontal:'10%',paddingVertical:30,backgroundColor:'white'}}>
            <Paragraph style={{fontSize:20,fontWeight:'500'}}>{this.state.screen}</Paragraph>
          </Card>

          <Card elevation={3} style={{paddingVertical:30}}>
            {numbers.length>0?
            <FlatList
                data={numbers}
                nestedScrollEnabled={true}
                style={{}}
                numColumns={3}
                        renderItem={({ item }) => (
                          
                          <View
                            style={{ 
                              flex:1,
                              maxWidth: Dimensions.get('window').width / 3 - 10, 
                              justifyContent: 'center',
                              alignItems:'center',    
                              margin:5
                            }}
                          >
                                <TouchableOpacity onPress={()=>{
                                  if(item.title=='=')
                                  this.performOperation();
                                  else{
                                    this.updateScreen(item.title);
                                  }
                                  }}
                                  style={{marginVertical:10}}
                                  >
                                  <Paragraph style={{
                                    fontSize:20,
                                    color:item.id>10?'orange':'black',
                                    fontWeight:item.id>10?'700':'500'
                                    }}>{item.title}</Paragraph>
                                </TouchableOpacity>
                                
                          </View>
                        )}
                keyExtractor={(item, index) => index.toString()}
            />
            :
            null
            }
            <View style={{flexDirection:'row',alignSelf:'center',marginTop:10}}>
                                    <IconButton
                                        icon="restart"
                                        color={'orange'}
                                        size={25}
                                        style={{marginHorizontal:'10%'}}
                                        onPress={() => this.setInitialState()}
                                    />
                                    <IconButton
                                        icon="backspace"
                                        color={'orange'}
                                        size={25}
                                        style={{marginHorizontal:'10%'}}
                                        onPress={() => this.doBackspace()}
                                    />
            </View>
          </Card>


      </SafeAreaView>
    );
  }
  
}
