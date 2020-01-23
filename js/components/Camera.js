import React from "react";
import { StyleSheet, View } from "react-native";
import ImagePicker from "react-native-image-picker";
import { connect } from "react-redux";
import { navigate } from "../redux/render/render.action";
import {selectUserId} from '../redux/user/user.selectors';
import { setTourId } from '../redux/tour/tour.action';
import { selectTourName, selectTourId } from '../redux/tour/tour.selectors';
import { setTourPanos } from '../redux/pano/pano.action';
import { selectPanoId, selectTourPanos } from '../redux/pano/pano.selectors';
import {
  Container,
  Header,
  Content,
  Text,
  Left,
  Body,
  Right,
  Button
} from "native-base";
import axios from "axios";

const UseCamera = (props) => {

  const propsvalue = () => {
    return props.forobject;
  }

  const takePhoto = (bool) => {
    let options = {
      storageOptions: {
        cameraRoll: true,
        skipBackup: true,
        path: "images"
      }
    };
    ImagePicker.launchCamera(options, response => {
      if (bool) {
        const source = { uri: response.uri };
        // alert(JSON.stringify(source));
        axios.get(`http://tourviewarserver.herokuapp.com/api/getpresignedurlforobject/arobjectimages`)
        .then(results => {
          const xhr = new XMLHttpRequest();
          xhr.open(
            "PUT", results.data.presignedUrl
          );
          xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
              console.log(xhr.status);
              console.log(xhr);
              if (xhr.status === 200) {
                alert("Image successfully uploaded to S3");
                axios.post(`http://tourviewarserver.herokuapp.com/api/object`, {
                  object_type: 'image',
                  object_value: results.data.publicUrl,
                  id_pano: props.selectPanoId
                })
                .then(results => {
                  axios.get(
                    `http://tourviewarserver.herokuapp.com/api/scenes/${props.selectTourId}`
                  ).then(results => props.setTourPanos(results.data))
                  .then(() => props.navigate('EDIT_AR_PAGE'))
                  .catch(err => console.log(err));
                })
                .catch(err => alert(err));
              } else {
                alert("Error while sending the image to S3");
              }
            }
          };
          xhr.setRequestHeader("Content-Type", "image/jpeg");
          xhr.send({ uri: source.uri, type: "image/jpeg", name: "cameratest.jpg" });
        })
        .catch(err => alert(JSON.stringify(err)));
    } else {
      const source = { uri: response.uri };
      // alert(JSON.stringify(source));
      axios.get(`http://tourviewarserver.herokuapp.com/api/getpresignedurl/panoimages`)
      .then(results => {
        const xhr = new XMLHttpRequest();
        xhr.open(
          "PUT", results.data.presignedUrl
        );
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            console.log(xhr.status);
            console.log(xhr);
            if (xhr.status === 200) {
              // alert("Image successfully uploaded to S3");
              axios.post(`http://tourviewarserver.herokuapp.com/api/newtour`, {
                id: results.data.id,
                img_url: results.data.publicUrl,
                tour_name: props.selectTourName,
                id_user: props.selectUserId
              })
              .then(results => props.setTourId(results.data.tourid))
              .then(() => {
                axios.get(`http://tourviewarserver.herokuapp.com/api/scenes/${props.selectTourId}`)
                .then(results => {
                  alert(results.data.rows)
                  props.setTourPanos(results.data.rows);
                  // props.navigate('CREATE_AR_PAGE')
                })
                .then(() => alert("hellooooo"))
                .catch(err => console.log(err));
              })
              .catch(err => alert(err));
            } else {
              alert("Error while sending the image to S3");
            }
          }
        };
        xhr.setRequestHeader("Content-Type", "image/jpeg");
        xhr.send({ uri: source.uri, type: "image/jpeg", name: "pickertest.jpg" });
      })
      .catch(err => alert(JSON.stringify(err)));
    }
    });
  }
    return (
      <Container style={{ width: 400, height: 700 }}>
        <Header>
          <Left>
            <Button
              hasText
              transparent
              onPress={() => {
                props.navigate("REACT_NATIVE_HOME");
              }}
            >
              <Text>Back</Text>
            </Button>
          </Left>
          <Body />
          <Right />
        </Header>
        <View style={styles.container}>
          <Text style={{ color: "#3FA4F0" }} onPress={() => takePhoto(propsvalue())}>
            Take A Photo
          </Text>
        </View>
      </Container>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

const mapStateToProps = state => {
  return {
    selectTourName: selectTourName(state),
    selectTourId: selectTourId(state),
    selectUserId: selectUserId(state),
    selectPanoId: selectPanoId(state),
    selectTourPanos: selectTourPanos(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    navigate: render => dispatch(navigate(render)),
    setTourId: id => dispatch(setTourId(id)),
    setTourPanos: tours => dispatch(setTourPanos(tours))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UseCamera);