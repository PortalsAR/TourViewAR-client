import React, { Component } from "react";

import axios from "axios";

import {
  StyleSheet,
  View,
  TextInput,
  Image,
  AppRegistry,
  PixelRatio,
  TouchableHighlight
} from "react-native";

import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Title,
  Button,
  Text,
  Left,
  Body,
  Right,
  TabHeading
} from "native-base";

import { ViroVRSceneNavigator, ViroARSceneNavigator } from "react-viro";

import { connect } from "react-redux";

import { selectNavigator } from "../redux/render/render.selectors";

import {
  selectUserName,
  selectUserPassword,
  selectUserProfilePic
} from "../redux/user/user.selectors";

import { setPanoId, setSceneHistory } from "../redux/pano/pano.action";

import { setObjectId, setSelectedText } from "../redux/object/object.action";
import { selectObjectId, selectSelectedText } from "../redux/object/object.selectors";

import { selectTourPanos, selectPanoId, selectSceneHistory } from "../redux/pano/pano.selectors";

import {
  setObjectXCoordinate,
  setObjectYCoordinate
} from "../redux/object/object.action";

import {
  selectObjectXCoordinate,
  selectObjectYCoordinate
} from "../redux/object/object.selectors";

import { navigate } from "../redux/render/render.action";

import {
  setUserName,
  setUserPassword,
  setUserProfilePic,
  setUserId
} from "../redux/user/user.action";

import HomePage from "./Homepage";

import Signup from "./Signup";

import Profile from "./Profile";

import Search from "./Search";

import ImageUpload from "./ImagePicker";

import UseCamera from "./Camera";
import CreateTextObject from "./CreateTextObject";
import Create from "./Create";
import CreateOptions from "./CreateOptions";
import CreateOptionsObject from "./CreateOptionsObject";
import CreateOptionsScene from "./CreateOptionsScene";
import ARScene from "./ARScene";

var sharedProps = {
  apiKey: "API_KEY_HERE"
};

// Sets the default scene you want for AR
var InitialARScene = require("../HelloWorldSceneAR.js");
var tcARscene = require("../TourContainerAR.js");

var UNSET = "UNSET";
var VR_NAVIGATOR_TYPE = "VR";
var AR_NAVIGATOR_TYPE = "AR";
var AR_NAVIGATOR_TYPE_TC = "ARtc";
var REACT_NATIVE_SIGNUP = "SIGNUP";
var REACT_NATIVE_HOME = "REACT_NATIVE_HOME";
var PROFILE = "PROFILE";
var IMAGE_UPLOAD = "IMAGE_UPLOAD";
var LOGIN_PAGE = "LOGIN_PAGE";
var CAMERA_PAGE = "CAMERA_PAGE";
var SEARCH_PAGE = "SEARCH_PAGE";
var CREATE_TOUR = "CREATE_TOUR";
var CREATE_OPTIONS = "CREATE_OPTIONS";
var CREATE_AR_PAGE = "CREATE_AR_PAGE";
var VIEW_AR_PAGE = "VIEW_AR_PAGE";
var EDIT_AR_PAGE = "EDIT_AR_PAGE";
var CAMERA_PAGE_OBJECT = "CAMERA_PAGE_OBJECT";
var IMAGE_PICKER_PAGE_OBJECT = "IMAGE_PICKER_PAGE_OBJECT";
var CREATE_TEXT_OBJECT = "CREATE_TEXT_OBJECT";
var CREATE_IMAGE_OBJECT = "CREATE_IMAGE_OBJECT";
var CREATE_OPTIONS_SCENE = "CREATE_OPTIONS_SCENE";
var CAMERA_PAGE_SCENE = "CAMERA_PAGE_SCENE";
var IMAGE_PICKER_PAGE_SCENE = "IMAGE_PICKER_PAGE_SCENE";
// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.
var defaultNavigatorType = UNSET;
class Login extends Component {
  constructor() {
    super();
    this.state = {
      navigatorType: defaultNavigatorType,
      sharedProps: sharedProps,
      editmode: false,
      objects: [],
      textinput: "",
      entertext: false
    };
    this._getExperienceSelector = this._getExperienceSelector.bind(this);
    this._getARNavigator = this._getARNavigator.bind(this);
    this._getReactNativeHome = this._getReactNativeHome.bind(this);
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(this);
    this._getProfilePage = this._getProfilePage.bind(this);
    this._getImageUpload = this._getImageUpload.bind(this);
    this._getSearchPage = this._getSearchPage.bind(this);
    this._exitViro = this._exitViro.bind(this);
    this._getUserLogin = this._getUserLogin.bind(this);
    this._loginHandler = this._loginHandler.bind(this);
    this._getARNavigatorTC = this._getARNavigatorTC.bind(this);
    this._getCreateOptions = this._getCreateOptions.bind(this);
    this._getViewARPage = this._getViewARPage.bind(this);
    this._getCreateARPage = this._getCreateARPage.bind(this);
    this._getEditARPage = this._getEditARPage.bind(this);
    this._getCameraPage = this._getCameraPage.bind(this);
    this._createImageObject = this._createImageObject.bind(this);
    this._createTextObject = this._createTextObject.bind(this);
    this._saveChanges = this._saveChanges.bind(this);
    this._addScenePhoto = this._addScenePhoto.bind(this);
    this._uploadScenePhoto = this._uploadScenePhoto.bind(this);
  }
  render() {
    if (this.props.selectNavigator === LOGIN_PAGE) {
      return this._getExperienceSelector();
    } else if (this.props.selectNavigator === AR_NAVIGATOR_TYPE) {
      return this._getARNavigator();
    } else if (this.props.selectNavigator === AR_NAVIGATOR_TYPE_TC) {
      return this._getARNavigatorTC();
    } else if (this.props.selectNavigator === REACT_NATIVE_HOME) {
      return this._getReactNativeHome();
    } else if (this.props.selectNavigator === REACT_NATIVE_SIGNUP) {
      return this._getReactNativeSignup();
    } else if (this.props.selectNavigator === PROFILE) {
      return this._getProfilePage();
    } else if (this.props.selectNavigator === IMAGE_UPLOAD) {
      return this._getImageUpload(false, false);
    } else if (this.props.selectNavigator === CAMERA_PAGE) {
      return this._getCameraPage(false, false);
    } else if (this.props.selectNavigator === SEARCH_PAGE) {
      return this._getSearchPage();
    } else if (this.props.selectNavigator === CREATE_TOUR) {
      return this._getCreatePage();
    } else if (this.props.selectNavigator === CREATE_OPTIONS) {
      return this._getCreateOptions();
    } else if (this.props.selectNavigator === VIEW_AR_PAGE) {
      return this._getViewARPage();
    } else if (this.props.selectNavigator === CREATE_AR_PAGE) {
      return this._getCreateARPage();
    } else if (this.props.selectNavigator === EDIT_AR_PAGE) {
      return this._getEditARPage();
    } else if (this.props.selectNavigator === CAMERA_PAGE_OBJECT) {
      return this._getCameraPage(true, false);
    } else if (this.props.selectNavigator === IMAGE_PICKER_PAGE_OBJECT) {
      return this._getImageUpload(true, false);
    } else if (this.props.selectNavigator === CREATE_TEXT_OBJECT) {
      return this._createTextObject();
    } else if (this.props.selectNavigator === CREATE_IMAGE_OBJECT) {
      return this._createImageObject();
    } else if (this.props.selectNavigator === CREATE_OPTIONS_SCENE) {
      return this._createOptionsScene();
    } else if (this.props.selectNavigator === CAMERA_PAGE_SCENE) {
      return this._getCameraPage(false, true);
    } else if (this.props.selectNavigator === IMAGE_PICKER_PAGE_SCENE) {
      return this._getImageUpload(false, true);
    }
  }

  _createOptionsScene() {
    return (<CreateOptionsScene />);
  }

  _loginHandler() {}
  // Presents the user with a choice of an AR or VR experience
  _getExperienceSelector() {
    return (
      <Container style={{ width: "100%", height: "100%" }}>
        <Header>
          <Left />
          <Body>
            <Title>TourViewAR</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../res/logo.png")}
              style={{ height: 200, width: 200 }}
            />
          </View>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Form
              style={{
                width: 250
              }}
            >
              <Item floatingLabel>
                <Label>Username</Label>
                <Input onChangeText={text => this.props.setUserName(text)} />
              </Item>
              <Item floatingLabel>
                <Label>Password</Label>
                <Input
                  secureTextEntry={true}
                  onChangeText={text => this.props.setUserPassword(text)}
                />
              </Item>
            </Form>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Button
                block
                light
                style={{
                  margin: 20,
                  width: 250
                }}
                // onPress={this._loginHandler}
                onPress={this._getUserLogin}
              >
                <Text>Login</Text>
              </Button>
            </View>
          </View>
          <View style={styles.outer}>
            <Button
              block
              onPress={() => {
                this.props.navigate(REACT_NATIVE_HOME);
              }}
              style={{ marginBottom: 20 }}
            >
              <Text style={styles.buttonText}>HOMEPAGE</Text>
            </Button>

            <Button
              block
              onPress={() => {
                this.props.navigate(REACT_NATIVE_SIGNUP);
              }}
            >
              <Text style={styles.buttonText}>SIGN UP</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator() {
    return (
      <ViroARSceneNavigator
        {...this.state.sharedProps}
        initialScene={{ scene: InitialARScene }}
      />
    );
  }
  _getARNavigatorTC() {
    return (
      <ViroARSceneNavigator
        {...this.state.sharedProps}
        initialScene={{ scene: tcARscene }}
      />
    );
  }
  _getReactNativeHome() {
    return <HomePage />;
  }
  _getReactNativeSignup() {
    return <Signup />;
  }
  _getProfilePage() {
    return <Profile />;
  }
  _getImageUpload(forobject, forscene) {
    return <ImageUpload forobject={forobject} forscene={forscene}/>;
  }
  _getCameraPage(forobject, forscene) {
    return <UseCamera forobject={forobject} forscene={forscene}/>;
  }
  _getSearchPage() {
    return <Search />;
  }
  _getCreatePage() {
    return <Create />;
  }
  _getCreateOptions() {
    return <CreateOptions />;
  }
  _getViewARPage() {
    let initialScene = (
      <ARScene
        editable={true}
        isnew={false}
        publicUrl={this.props.selectTourPanos[0].img_url}
        scenes={this.props.selectTourPanos}
      />
    );
    return <ViroARSceneNavigator initialScene={{ scene: initialScene }} />;
  }

  _createTextObject() {
    return <CreateTextObject />;
  }

  _createImageObject() {
    return <CreateOptionsObject />;
    // axios
    //   .post(`http://tourviewarserver.herokuapp.com/api/object`, {
    //     object_type: "image",
    //     object_value: publicUrl,
    //     id_pano: this.props.selectPanoId
    //   })
    //   .then(results => {
    //     this.props.setObjectId(results.data.id);
    //     let textobject = {
    //       id: results.data.id,
    //       type: "image",
    //       x: 0,
    //       y: 0,
    //       value: publicUrl,
    //       scale: { x: 1, y: 1, z: 1 },
    //       id_pano: this.props.selectPanoId
    //     };
    //     this.setState({ objects: [...this.state.objects, textobject] });
    //   })
    //   .catch(err => alert("There was an error creating this object"));
  }

  _getCreateARPage() {
    let initialARScene = require("./ARScene.js");
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <ViroARSceneNavigator
          {...this.state.sharedProps}
          viroAppProps={{
            selectObjectId: this.props.selectObjectId,
            selectPanoId: this.props.selectPanoId,
            setPanoId: this.props.setPanoId,
            setObjectId: this.props.setObjectId,
            selectIsNew: true,
            selectIsEditable: true,
            selectTourPanos: this.props.selectTourPanos
          }}
          initialScene={{ scene: InitialARScene }}
        />
        <View style={styles.addButtons}>
          {this.state.editmode ? (
            <View>
              <TouchableHighlight
                style={styles.textButton}
                onPress={() => {
                  this.props.navigate("CREATE_TEXT_OBJECT");
                }}>
                <Text style={styles.textStyle2}>ADD TEXT</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.textButton} 
                onPress={() => {
                  this.props.navigate("CREATE_IMAGE_OBJECT");
                }}>
                <Text style={styles.textStyle2}>ADD IMAGE</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.textButton} onPress={() => {
                  this.props.navigate("CREATE_OPTIONS_SCENE");
                }}>
                <Text style={styles.textStyle2}>ADD SCENE</Text>
              </TouchableHighlight>
            </View>
          ) : null}
        </View>
        <View style={styles.editFooter}>
          <TouchableHighlight
            style={styles.editButton}
            underlayColor={`#68a0ff`}
            onPress={() => this.setState({ editmode: !this.state.editmode })}
          >
            <Text style={styles.textStyle}>
              {this.state.editmode ? "SAVE" : "EDIT"}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.cancelButton}
            underlayColor={`#68a0ff`}
            onPress={() => this.props.navigate("REACT_NATIVE_HOME")}
          >
            <Text style={styles.textStyle}>HOME</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  _getEditARPage() {
    let initialARScene = require("./ARScene.js");
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <ViroARSceneNavigator
          {...this.state.sharedProps}
          viroAppProps={{
            setSelectedText: this.props.setSelectedText,
            selectSelectedText: this.props.selectSelectedText,
            selectObjectId: this.props.selectObjectId,
            selectPanoId: this.props.selectPanoId,
            setPanoId: this.props.setPanoId,
            setObjectId: this.props.setObjectId,
            selectIsNew: false,
            selectIsEditable: true,
            selectTourPanos: this.props.selectTourPanos,
            setObjectXCoordinate: this.props.setObjectXCoordinate,
            setObjectYCoordinate: this.props.setObjectYCoordinate,
            selectObjectXCoordinate: this.props.selectObjectXCoordinate,
            selectObjectYCoordinate: this.props.selectObjectYCoordinate,
            setSceneHistory: this.props.setSceneHistory,
            selectSceneHistory: this.props.selectSceneHistory
          }}
          initialScene={{ scene: InitialARScene }}
        />
        <View style={styles.selectedTextContainer}>
          <TouchableHighlight style={styles.topButton}>
            <Text style={styles.textStyle2}>
              {this.props.selectSelectedText}
            </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.addButtons}>
          {this.state.editmode ? (
            <View>
              <TouchableHighlight
                style={styles.textButton}
                onPress={() => {
                  this.props.navigate("CREATE_TEXT_OBJECT");
                }}
              >
                <Text style={styles.textStyle2}>ADD TEXT</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.textButton}
                onPress={() => {
                  this.props.navigate("CREATE_IMAGE_OBJECT");
                }}
              >
                <Text style={styles.textStyle2}
                                onPress={() => {
                                  this.props.navigate("CREATE_IMAGE_OBJECT");
                                }}>ADD IMAGE</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.textButton} onPress={() => {
                  this.props.navigate("CREATE_OPTIONS_SCENE");
                }}>
                <Text style={styles.textStyle2}>ADD SCENE</Text>
              </TouchableHighlight>
            </View>
          ) : null}
        </View>
        <View style={styles.editFooter}>
          <TouchableHighlight
            style={styles.editButton}
            underlayColor={`#68a0ff`}
            onPress={() => {
              if (!this.state.editmode) {
                this.setState({ editmode: !this.state.editmode });
              } else {
                this.setState({ editmode: !this.state.editmode }, () => {
                  this._saveChanges();
                });
              }
            }}
          >
            <Text style={styles.textStyle}>
              {this.state.editmode ? "SAVE" : "EDIT"}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.cancelButton}
            underlayColor={`#68a0ff`}
            onPress={() => this.props.navigate("REACT_NATIVE_HOME")}
          >
            <Text style={styles.textStyle}>HOME</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  _saveChanges() {
    axios
      .put(`http://tourviewarserver.herokuapp.com/api/object`, {
        x: this.props.selectObjectXCoordinate,
        y: this.props.selectObjectYCoordinate,
        scalex: 1,
        scaley: 1,
        scalez: 1,
        id_object: this.props.selectObjectId
      })
      .then(results => alert("Changes Saved"))
      .catch(err => console.log(err));
  }

  _getUserLogin() {
    axios
      .get(
        `http://tourviewarserver.herokuapp.com/api/login`,
        {
          params: {
            username: this.props.selectUserName,
            pw: this.props.selectUserPassword
          }
        },
        { headers: { "Content-Type": "application/json" } }
      )
      // .then(() => console.log(this.props.selectUserName))
      .then(results => {
        alert(`Welcome ${JSON.stringify(results.data.rows[0].username)} !!`);
        if (
          results.data.rows[0].username === this.props.selectUserName &&
          results.data.rows[0].pw === this.props.selectUserPassword
        ) {
          this.props.setUserProfilePic(results.data.rows[0].profile_pic_url);
          this.props.setUserId(results.data.rows[0].id);

          return this.props.navigate("REACT_NATIVE_HOME");
        }
      })
      .catch(err => alert("invalid username or password"));
  }
  // This function returns an anonymous/lambda function to be used
  // by the experience selector buttons
  _getExperienceButtonOnPress(navigatorType) {
    return () => {
      this.setState({
        navigatorType: navigatorType
      });
    };
  }
  // This function "exits" Viro by setting the navigatorType to UNSET.
  _exitViro() {
    this.setState({
      navigatorType: UNSET
    });
  }
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#68a0dd"
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20
  },
  title: {
    color: "black",
    borderWidth: 1,
    borderColor: "#000",
    margin: 10
  },
  viroContainer: {
    // flex: 1,
    backgroundColor: "white"
  },
  outer: {
    // flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white"
  },
  homepage: {
    // flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#68a0cf"
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color: "black",
    textAlign: "center",
    fontSize: 25
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 15
  },
  buttons: {
    height: 60,
    width: 120,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#68a0cf",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
  },
  exitButton: {
    height: 50,
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#68a0cf",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
  },

  editFooter: {
    width: "100%",
    position: "absolute",
    top: 700,
    left: 310,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

  editButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    width: 150,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "rgba(23,243,11,.4)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(23,243,11,.4)"
  },

  cancelButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
    height: 80,
    width: 150,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "rgba(231,13,21,.4)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(231,13,21,.4)"
  },

  textButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
    height: 80,
    width: 80,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "rgba(123,123,231,.4)",
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "rgba(123,087,231,.4)"
  },

  addButtons: {
    width: "100%",
    position: "absolute",
    top: 225,
    left: 310,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

  textStyle: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 30
  },
  textStyle2: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 14
  },
  addTextField: {
    position: "absolute",
    top: 425,
    left: 310,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  selectedTextContainer: {
    width: "100%",
    position: "absolute",
    top: 25,
    left: 310,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  topButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
    height: 80,
    width: 80,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "rgba(123,123,231,0)",
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "rgba(123,087,231,0)"
  }
});
const mapDispatchToProps = dispatch => {
  return {
    navigate: render => dispatch(navigate(render)),
    setUserName: name => dispatch(setUserName(name)),
    setUserPassword: password => dispatch(setUserPassword(password)),
    setUserProfilePic: pic => dispatch(setUserProfilePic(pic)),
    setUserId: id => dispatch(setUserId(id)),
    setPanoId: panoid => dispatch(setPanoId(panoid)),
    setObjectId: objectid => dispatch(setObjectId(objectid)),
    setObjectXCoordinate: x => dispatch(setObjectXCoordinate(x)),
    setObjectYCoordinate: y => dispatch(setObjectYCoordinate(y)),
    setSelectedText: text => dispatch(setSelectedText(text)),
    setSceneHistory: scenes => dispatch(setSceneHistory(scenes))
  };
};
const mapStateToProps = state => {
  return {
    selectNavigator: selectNavigator(state),
    selectUserName: selectUserName(state),
    selectUserPassword: selectUserPassword(state),
    selectTourPanos: selectTourPanos(state),
    selectPanoId: selectPanoId(state),
    selectObjectId: selectObjectId(state),
    selectObjectXCoordinate: selectObjectXCoordinate(state),
    selectObjectYCoordinate: selectObjectYCoordinate(state),
    selectSelectedText: selectSelectedText(state),
    selectSceneHistory: selectSceneHistory(state)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
