import * as React from 'react';
import {Text, View,FlatList,Dimensions,TouchableOpacity ,SafeAreaView, Vibration} from 'react-native';
import {Paragraph,IconButton,Card} from 'react-native-paper';
import {evaluate} from 'mathjs';
import {connect} from 'react-redux';
import {setScreen,setInitialState} from './redux/actions';

class CalculatorComponent extends React.Component {

  
  performOperation(){
    let screen=String(this.props.screen);
    let output='';
    try{
      output=evaluate(screen);
    }
    catch(err){
      console.log(err);
      output='Error!'
    }
    console.log(output)
    this.props.dispatch(setScreen(output));    //Dispatch output to create a new state
  }

  updateScreen(value){
    let screen=String(this.props.screen);
    if(screen=='null'){
      screen=value;
    }
    else{
      screen=screen+value;
    }
    
    this.props.dispatch(setScreen(screen));
  }

  doBackspace(){
    let screen=String(this.props.screen);
    if(screen!='null'){
      screen=screen.slice(0,screen.length-1);
    }
    if(screen==''){
      screen='null'
    }
    this.props.dispatch(setScreen(screen));
  }

  componentDidMount(){
    this.props.dispatch(setInitialState());
  }
  
  render(){
    const numbers=this.props.numbers;
    return (
      <SafeAreaView style={{width:'90%',alignSelf:'center'}}>
        
          <View style={{
              marginHorizontal:'1%',
              marginVertical:10
            }}>
            <Paragraph style={{
              fontSize:20,
              fontWeight:'700',
              color:'orange',
              marginTop:40,
              width:'100%'
              }}>MyCalc</Paragraph>
          </View>

      
          <Card elevation={3} style={{
                marginVertical:20,
                paddingHorizontal:'10%',
                paddingVertical:30,
                backgroundColor:'white'
            }}>
            <Paragraph style={{
                fontSize:20,
                fontWeight:'500'
              }}>{this.props.screen}</Paragraph>
          </Card>

          <Card elevation={3} style={{
                paddingVertical:30
            }}>
            {numbers.length>0?
            <FlatList
                data={numbers}
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
                                    Vibration.vibrate(50);
                                    if(item.title=='=')
                                      this.performOperation();
                                    else{
                                      this.updateScreen(item.title);
                                    }
                                    }}
                                    style={{
                                        alignSelf: 'center',
                                        textAlign: 'center',
                                        marginVertical:10
                                    }}
                                    delayPressIn={0}
                                  >
                                  <Paragraph style={{
                                                fontSize:25,
                                                color:item.id>10?'orange':'black',
                                                fontWeight:item.id>10?'700':'500',
                                                paddingVertical:5
                                              }}
                                      textBreakStrategy='simple'
                                    >{item.title}
                                  </Paragraph>
                                </TouchableOpacity>
                                
                          </View>
                        )}
                keyExtractor={(item, index) => index.toString()}
            />
            :
            null
            }
            <View style={{
                    flexDirection:'row',
                    alignSelf:'center',
                    marginTop:10
              }}>
                                    <IconButton
                                        icon="restart"
                                        color={'orange'}
                                        size={25}
                                        style={{
                                          marginHorizontal:'10%'
                                        }}
                                        onPress={() => this.props.dispatch(setInitialState())}
                                    />
                                    <IconButton
                                        icon="backspace"
                                        color={'orange'}
                                        size={25}
                                        style={{
                                          marginHorizontal:'10%'
                                        }}
                                        onPress={() => this.doBackspace()}
                                    />
            </View>
          </Card>


      </SafeAreaView>
    );
  }
  
}

const mapStateToProps = state => ({
  screen:state.screen,
  numbers:state.numbers
});

export default connect(mapStateToProps) (CalculatorComponent) ;    //Connecting the component to Redux Store