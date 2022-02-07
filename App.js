import * as React from 'react';
import { StatusBar, FlatList, Image, Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
const { width, height } = Dimensions.get('screen');

const data = [
    'https://pbs.twimg.com/media/FKiwmadX0AA3BKs?format=jpg&name=medium',
    'https://pbs.twimg.com/media/FKhcCgeXoAIDzqv?format=jpg&name=large',
    'https://pbs.twimg.com/media/FKj0n28UcAEHi1t?format=jpg&name=900x900',
    'https://pbs.twimg.com/media/FKyK7ZFXMAM7vRe?format=png&name=small',
    'https://pbs.twimg.com/media/FKsUWdjVQAEePd8?format=jpg&name=medium',
    'https://pbs.twimg.com/media/FKrJrzmUYAAy1uT?format=jpg&name=medium',
    'https://pbs.twimg.com/media/FKmCqMyVkAE2H8u?format=jpg&name=medium',
    'https://pbs.twimg.com/media/FKl-714XIAkgSsc?format=jpg&name=medium',
    'https://pbs.twimg.com/media/FKiplVFXIAAavjg?format=jpg&name=medium',
    'https://pbs.twimg.com/media/FKFQ-k8XoAEBL8l?format=jpg&name=large',
    'https://pbs.twimg.com/media/FKXT8f1WQAsyhmh?format=jpg&name=medium',

];

const imageW = width * 0.7;
const imageH = imageW * 1.54;

export default () => {
    const scrollX = React.useRef(new Animated.Value(0)).current;
    return (
        <View style={{ flex: 1, backgroundColor: '#000' }}>
            <StatusBar hidden />
            <View
            style={StyleSheet.absoluteFillObject}
            >
                {data.map((image,index) => {
                    const inputRange =[
                        (index - 1) * width,
                        index * width,
                        (index + 1) * width 
                    ]
                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0, 1, 0]
                    })
                    return <Animated.Image
                        key={`image-${index}`}
                        source={{uri: image}}
                        style={[
                            StyleSheet.absoluteFillObject,
                            {
                                opacity
                            }
                        ]}
                        blurRadius={35}
                    /> })}
            </View>
            <Animated.FlatList
                data={data}
                onScroll={Animated.event(
                    [{nativeEvent:{contentOffset:{x: scrollX}}}],
                    {useNativeDriver:true}
                )}
                keyExtractor={(_, index)=>index.toString()}
                horizontal
                pagingEnabled
                renderItem={({item}) => {
                    return <View style={{
                        width,alignItems:'center',justifyContent:'center',
                        shadowColor:'#000',
                        shadowOpacity:5,
                        shadowOffset:{
                            width:0,
                            height:0,
                        },
                        shadowRadius:20,
                        }}>
                        <Image
                        source={{uri: item}} style={{
                            width :imageW,
                            height : imageH,
                            resizeMode:'cover',
                            borderRadius:16
                        }}
                        />
                        <TouchableOpacity  style={{
                            width:160,height:55,
                            alignSelf:'center',marginTop:60,
                            backgroundColor:'#0b0447',
                            borderRadius:50,
                            opacity:.5,
                            }} >
                                    <Text style={{color:'#fff',alignSelf:'center',fontSize:29,fontWeight:'600',justifyContent: 'center',marginTop:10,}} >Mint</Text>
                        </TouchableOpacity>
                    </View>
                    
                }
                
                }
            />

            
        </View>
    );
};