System.register("chunks:///_virtual/debug-view-runtime-control.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Canvas, UITransform, instantiate, Label, Color, RichText, Toggle, Button, director, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Canvas = module.Canvas;
      UITransform = module.UITransform;
      instantiate = module.instantiate;
      Label = module.Label;
      Color = module.Color;
      RichText = module.RichText;
      Toggle = module.Toggle;
      Button = module.Button;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "b2bd1+njXxJxaFY3ymm06WU", "debug-view-runtime-control", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var DebugViewRuntimeControl = exports('DebugViewRuntimeControl', (_dec = ccclass('internal.DebugViewRuntimeControl'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DebugViewRuntimeControl, _Component);
        function DebugViewRuntimeControl() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "compositeModeToggle", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "singleModeToggle", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "EnableAllCompositeModeButton", _descriptor3, _assertThisInitialized(_this));
          _this._single = 0;
          _this.strSingle = ['No Single Debug', 'Vertex Color', 'Vertex Normal', 'Vertex Tangent', 'World Position', 'Vertex Mirror', 'Face Side', 'UV0', 'UV1', 'UV Lightmap', 'Project Depth', 'Linear Depth', 'Fragment Normal', 'Fragment Tangent', 'Fragment Binormal', 'Base Color', 'Diffuse Color', 'Specular Color', 'Transparency', 'Metallic', 'Roughness', 'Specular Intensity', 'IOR', 'Direct Diffuse', 'Direct Specular', 'Direct All', 'Env Diffuse', 'Env Specular', 'Env All', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Fresnel', 'Direct Transmit Diffuse', 'Direct Transmit Specular', 'Env Transmit Diffuse', 'Env Transmit Specular', 'Transmit All', 'Direct Internal Specular', 'Env Internal Specular', 'Internal All', 'Fog'];
          _this.strComposite = ['Direct Diffuse', 'Direct Specular', 'Env Diffuse', 'Env Specular', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Normal Map', 'Fog', 'Tone Mapping', 'Gamma Correction', 'Fresnel', 'Transmit Diffuse', 'Transmit Specular', 'Internal Specular', 'TT'];
          _this.strMisc = ['CSM Layer Coloration', 'Lighting With Albedo'];
          _this.compositeModeToggleList = [];
          _this.singleModeToggleList = [];
          _this.miscModeToggleList = [];
          _this.textComponentList = [];
          _this.labelComponentList = [];
          _this.textContentList = [];
          _this.hideButtonLabel = void 0;
          _this._currentColorIndex = 0;
          _this.strColor = ['<color=#ffffff>', '<color=#000000>', '<color=#ff0000>', '<color=#00ff00>', '<color=#0000ff>'];
          _this.color = [Color.WHITE, Color.BLACK, Color.RED, Color.GREEN, Color.BLUE];
          return _this;
        }
        var _proto = DebugViewRuntimeControl.prototype;
        _proto.start = function start() {
          // get canvas resolution
          var canvas = this.node.parent.getComponent(Canvas);
          if (!canvas) {
            console.error('debug-view-runtime-control should be child of Canvas');
            return;
          }
          var uiTransform = this.node.parent.getComponent(UITransform);
          var halfScreenWidth = uiTransform.width * 0.5;
          var halfScreenHeight = uiTransform.height * 0.5;
          var x = -halfScreenWidth + halfScreenWidth * 0.1,
            y = halfScreenHeight - halfScreenHeight * 0.1;
          var width = 200,
            height = 20;

          // new nodes
          var miscNode = this.node.getChildByName('MiscMode');
          var buttonNode = instantiate(miscNode);
          buttonNode.parent = this.node;
          buttonNode.name = 'Buttons';
          var titleNode = instantiate(miscNode);
          titleNode.parent = this.node;
          titleNode.name = 'Titles';

          // title
          for (var i = 0; i < 2; i++) {
            var newLabel = instantiate(this.EnableAllCompositeModeButton.getChildByName('Label'));
            newLabel.setPosition(x + (i > 0 ? 50 + width * 2 : 150), y, 0.0);
            newLabel.setScale(0.75, 0.75, 0.75);
            newLabel.parent = titleNode;
            var _labelComponent = newLabel.getComponent(Label);
            _labelComponent.string = i ? '----------Composite Mode----------' : '----------Single Mode----------';
            _labelComponent.color = Color.WHITE;
            _labelComponent.overflow = 0;
            this.labelComponentList[this.labelComponentList.length] = _labelComponent;
          }
          y -= height;
          // single
          var currentRow = 0;
          for (var _i = 0; _i < this.strSingle.length; _i++, currentRow++) {
            if (_i === this.strSingle.length >> 1) {
              x += width;
              currentRow = 0;
            }
            var newNode = _i ? instantiate(this.singleModeToggle) : this.singleModeToggle;
            newNode.setPosition(x, y - height * currentRow, 0.0);
            newNode.setScale(0.5, 0.5, 0.5);
            newNode.parent = this.singleModeToggle.parent;
            var textComponent = newNode.getComponentInChildren(RichText);
            textComponent.string = this.strSingle[_i];
            this.textComponentList[this.textComponentList.length] = textComponent;
            this.textContentList[this.textContentList.length] = textComponent.string;
            newNode.on(Toggle.EventType.TOGGLE, this.toggleSingleMode, this);
            this.singleModeToggleList[_i] = newNode;
          }
          x += width;
          // buttons
          this.EnableAllCompositeModeButton.setPosition(x + 15, y, 0.0);
          this.EnableAllCompositeModeButton.setScale(0.5, 0.5, 0.5);
          this.EnableAllCompositeModeButton.on(Button.EventType.CLICK, this.enableAllCompositeMode, this);
          this.EnableAllCompositeModeButton.parent = buttonNode;
          var labelComponent = this.EnableAllCompositeModeButton.getComponentInChildren(Label);
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          var changeColorButton = instantiate(this.EnableAllCompositeModeButton);
          changeColorButton.setPosition(x + 90, y, 0.0);
          changeColorButton.setScale(0.5, 0.5, 0.5);
          changeColorButton.on(Button.EventType.CLICK, this.changeTextColor, this);
          changeColorButton.parent = buttonNode;
          labelComponent = changeColorButton.getComponentInChildren(Label);
          labelComponent.string = 'TextColor';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          var HideButton = instantiate(this.EnableAllCompositeModeButton);
          HideButton.setPosition(x + 200, y, 0.0);
          HideButton.setScale(0.5, 0.5, 0.5);
          HideButton.on(Button.EventType.CLICK, this.hideUI, this);
          HideButton.parent = this.node.parent;
          labelComponent = HideButton.getComponentInChildren(Label);
          labelComponent.string = 'Hide UI';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          this.hideButtonLabel = labelComponent;

          // misc
          y -= 40;
          for (var _i2 = 0; _i2 < this.strMisc.length; _i2++) {
            var _newNode = instantiate(this.compositeModeToggle);
            _newNode.setPosition(x, y - height * _i2, 0.0);
            _newNode.setScale(0.5, 0.5, 0.5);
            _newNode.parent = miscNode;
            var _textComponent = _newNode.getComponentInChildren(RichText);
            _textComponent.string = this.strMisc[_i2];
            this.textComponentList[this.textComponentList.length] = _textComponent;
            this.textContentList[this.textContentList.length] = _textComponent.string;
            var toggleComponent = _newNode.getComponent(Toggle);
            toggleComponent.isChecked = _i2 ? true : false;
            _newNode.on(Toggle.EventType.TOGGLE, _i2 ? this.toggleLightingWithAlbedo : this.toggleCSMColoration, this);
            this.miscModeToggleList[_i2] = _newNode;
          }

          // composite
          y -= 150;
          for (var _i3 = 0; _i3 < this.strComposite.length; _i3++) {
            var _newNode2 = _i3 ? instantiate(this.compositeModeToggle) : this.compositeModeToggle;
            _newNode2.setPosition(x, y - height * _i3, 0.0);
            _newNode2.setScale(0.5, 0.5, 0.5);
            _newNode2.parent = this.compositeModeToggle.parent;
            var _textComponent2 = _newNode2.getComponentInChildren(RichText);
            _textComponent2.string = this.strComposite[_i3];
            this.textComponentList[this.textComponentList.length] = _textComponent2;
            this.textContentList[this.textContentList.length] = _textComponent2.string;
            _newNode2.on(Toggle.EventType.TOGGLE, this.toggleCompositeMode, this);
            this.compositeModeToggleList[_i3] = _newNode2;
          }
        };
        _proto.isTextMatched = function isTextMatched(textUI, textDescription) {
          var tempText = new String(textUI);
          var findIndex = tempText.search('>');
          if (findIndex === -1) {
            return textUI === textDescription;
          } else {
            tempText = tempText.substr(findIndex + 1);
            tempText = tempText.substr(0, tempText.search('<'));
            return tempText === textDescription;
          }
        };
        _proto.toggleSingleMode = function toggleSingleMode(toggle) {
          var debugView = director.root.debugView;
          var textComponent = toggle.getComponentInChildren(RichText);
          for (var i = 0; i < this.strSingle.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strSingle[i])) {
              debugView.singleMode = i;
            }
          }
        };
        _proto.toggleCompositeMode = function toggleCompositeMode(toggle) {
          var debugView = director.root.debugView;
          var textComponent = toggle.getComponentInChildren(RichText);
          for (var i = 0; i < this.strComposite.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strComposite[i])) {
              debugView.enableCompositeMode(i, toggle.isChecked);
            }
          }
        };
        _proto.toggleLightingWithAlbedo = function toggleLightingWithAlbedo(toggle) {
          var debugView = director.root.debugView;
          debugView.lightingWithAlbedo = toggle.isChecked;
        };
        _proto.toggleCSMColoration = function toggleCSMColoration(toggle) {
          var debugView = director.root.debugView;
          debugView.csmLayerColoration = toggle.isChecked;
        };
        _proto.enableAllCompositeMode = function enableAllCompositeMode(button) {
          var debugView = director.root.debugView;
          debugView.enableAllCompositeMode(true);
          for (var i = 0; i < this.compositeModeToggleList.length; i++) {
            var _toggleComponent = this.compositeModeToggleList[i].getComponent(Toggle);
            _toggleComponent.isChecked = true;
          }
          var toggleComponent = this.miscModeToggleList[0].getComponent(Toggle);
          toggleComponent.isChecked = false;
          debugView.csmLayerColoration = false;
          toggleComponent = this.miscModeToggleList[1].getComponent(Toggle);
          toggleComponent.isChecked = true;
          debugView.lightingWithAlbedo = true;
        };
        _proto.hideUI = function hideUI(button) {
          var titleNode = this.node.getChildByName('Titles');
          var activeValue = !titleNode.active;
          this.singleModeToggleList[0].parent.active = activeValue;
          this.miscModeToggleList[0].parent.active = activeValue;
          this.compositeModeToggleList[0].parent.active = activeValue;
          this.EnableAllCompositeModeButton.parent.active = activeValue;
          titleNode.active = activeValue;
          this.hideButtonLabel.string = activeValue ? 'Hide UI' : 'Show UI';
        };
        _proto.changeTextColor = function changeTextColor(button) {
          this._currentColorIndex++;
          if (this._currentColorIndex >= this.strColor.length) {
            this._currentColorIndex = 0;
          }
          for (var i = 0; i < this.textComponentList.length; i++) {
            this.textComponentList[i].string = this.strColor[this._currentColorIndex] + this.textContentList[i] + '</color>';
          }
          for (var _i4 = 0; _i4 < this.labelComponentList.length; _i4++) {
            this.labelComponentList[_i4].color = this.color[this._currentColorIndex];
          }
        };
        _proto.onLoad = function onLoad() {};
        _proto.update = function update(deltaTime) {};
        return DebugViewRuntimeControl;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "compositeModeToggle", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "singleModeToggle", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "EnableAllCompositeModeButton", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./debug-view-runtime-control.ts', './Voiceinput.ts', './TelegramHandler.ts'], function () {
  return {
    setters: [null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/TelegramHandler.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, director, Component;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _class2;
      cclegacy._RF.push({}, "ff7170DUIRGZrcFbgw0Ztrw", "TelegramHandler", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var TelegramHandler = exports('TelegramHandler', (_dec = ccclass('TelegramHandler'), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(TelegramHandler, _Component);
        function TelegramHandler() {
          return _Component.apply(this, arguments) || this;
        }
        var _proto = TelegramHandler.prototype;
        _proto.onLoad = function onLoad() {
          // SINGLETON pattern
          if (TelegramHandler.instance) {
            this.node.destroy();
            return;
          }

          // DontDestroyOnLoad
          TelegramHandler.instance = this;
          director.addPersistRootNode(this.node);

          // Telegram
          this.InitTelegram();
        };
        _proto.LoadTelegramSDK = function LoadTelegramSDK() {
          // this.url.string = ‘loadTelegramSDK’
          return new Promise(function (resolve, reject) {
            if (window['Telegram'] && window['Telegram'].WebApp) {
              // Telegram SDK has already been loaded
              console.log('Telegram SDK has already been loaded:', window['Telegram']);
              window['Telegram'].WebApp.ready();
              resolve();
              return;
            }
            var script = document.createElement('script');
            script.src = 'https://telegram.org/js/telegram-web-app.js?56';
            script.onload = function () {
              console.log('SDK loaded successfully:', window['Telegram']);
              window['Telegram'].WebApp.ready();

              // SDK loaded successfully
              resolve();
            };
            script.onerror = function (error) {
              console.log('SDK loading failed:', error);
              // SDK loading failed
              reject(error);
            };
            document.head.appendChild(script);
          });
        };
        _proto.ProcessInitData = function ProcessInitData() {
          var _window$Telegram;
          var initData = (_window$Telegram = window['Telegram']) == null || (_window$Telegram = _window$Telegram.WebApp) == null ? void 0 : _window$Telegram.initData;

          //console.log('window.WebApp.initDataUnsafe: ', window['Telegram'].WebApp.initDataUnsafe);
          if (initData) {
            console.log("GOT THE INIT DATA!");
            var searchParams = new URLSearchParams(initData);
            console.log("query_id: ", searchParams.get("query_id"));
            console.log("auth_date: ", searchParams.get("auth_date"));
            console.log("hash: ", searchParams.get("hash"));
            var userDataString = searchParams.get("user");
            if (userDataString) {
              try {
                var userData = JSON.parse(decodeURIComponent(userDataString));
                console.log("User ID:", userData.id);
                console.log("First Name:", userData.first_name);
                console.log("Last Name:", userData.last_name);
                console.log("Username:", userData.username);
                console.log("Language Code:", userData.language_code);
                console.log("Allows Write to PM:", userData.allows_write_to_pm);
                console.log("Photo URL:", userData.photo_url);
              } catch (error) {
                console.error("Failed to parse user data:", error);
              }
            } else {
              console.warn("User data not found in initData.");
            }

            // save query_id
            TelegramHandler.telegramInitData = initData;
            TelegramHandler.telegramQueryId = searchParams.get("query_id");
          } else {
            console.warn('Telegram WebApp initData is not available.');
          }
        };
        _proto.LoadGameScene = function LoadGameScene() {
          console.log("Loading Game scene...");
          director.loadScene("Game", function () {
            console.log("Game scene loaded successfully!");
          });
        };
        _proto.InitTelegram = /*#__PURE__*/function () {
          var _InitTelegram = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return this.LoadTelegramSDK();
                case 3:
                  this.ProcessInitData();
                  this.LoadGameScene();
                  _context.next = 10;
                  break;
                case 7:
                  _context.prev = 7;
                  _context.t0 = _context["catch"](0);
                  console.error('Failed to load Telegram SDK:', _context.t0);
                //this.LoadGameScene();
                case 10:
                case "end":
                  return _context.stop();
              }
            }, _callee, this, [[0, 7]]);
          }));
          function InitTelegram() {
            return _InitTelegram.apply(this, arguments);
          }
          return InitTelegram;
        }();
        return TelegramHandler;
      }(Component), _class2.instance = null, _class2.telegramInitData = '', _class2.telegramQueryId = '', _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Voiceinput.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Button, EditBox, Label, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Button = module.Button;
      EditBox = module.EditBox;
      Label = module.Label;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
      cclegacy._RF.push({}, "00d40Jp615IA5Hvg9OYjSmY", "Voiceinput", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Voiceinput = exports('Voiceinput', (_dec = ccclass('Voiceinput'), _dec2 = property(Button), _dec3 = property(EditBox), _dec4 = property(Label), _dec5 = property(Label), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Voiceinput, _Component);
        function Voiceinput() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "btnVoiceInput", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "inputField", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labelInform", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labelDebug", _descriptor4, _assertThisInitialized(_this));
          _this.isRecording = false;
          _this.recognition = null;
          return _this;
        }
        var _proto = Voiceinput.prototype;
        _proto.onLoad = function onLoad() {
          var _this2 = this;
          this.PermissionCheck();
          var SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
          if (!SpeechRecognition) {
            console.error("SpeechRecognition not supported in this browser.");
            if (this.labelInform) this.labelInform.string = "SpeechRecognition not supported.";
            return;
          }
          this.recognition = new SpeechRecognition();
          this.recognition.lang = 'en-US';
          this.recognition.continuous = true;
          this.recognition.interimResults = false;
          this.recognition.onresult = function (event) {
            var transcript = event.results[event.resultIndex][0].transcript;
            console.log("Recognized:", transcript);
            if (_this2.inputField) {
              _this2.inputField.string += (_this2.inputField.string ? ' ' : '') + transcript;
            }
          };
          this.recognition.onerror = function (err) {
            console.error("Speech recognition error:", err);
            if (_this2.labelInform) _this2.labelInform.string = "Speech recognition error: " + err.error;
          };
          this.recognition.onend = function () {
            _this2.isRecording = false;
            _this2.UpdateButtonState();
            console.log("Speech recognition ended.");
            _this2.PermissionCheck();
          };
        };
        _proto.start = function start() {
          if (this.btnVoiceInput) {
            this.btnVoiceInput.node.on(Button.EventType.CLICK, this.OnVoiceButtonPressed, this);
          }
          this.UpdateButtonState();
        };
        _proto.OnVoiceButtonPressed = /*#__PURE__*/function () {
          var _OnVoiceButtonPressed = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var perm;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return this.RequestMicPermissionTelegram();
                case 2:
                  perm = _context.sent;
                  if (!(perm !== 'granted' && perm !== 'unknown')) {
                    _context.next = 7;
                    break;
                  }
                  this.labelInform.string = 'Microphone permission not granted.';
                  this.labelDebug.string = 'Telegram mic permission = ' + perm;
                  return _context.abrupt("return");
                case 7:
                  // 🔹 2️⃣ Nếu có quyền rồi => bắt đầu hoặc dừng recognition
                  if (!this.isRecording) {
                    console.log('Start speech recognition...');
                    this.labelInform.string = 'Recording...';
                    this.isRecording = true;
                    this.UpdateButtonState();
                    try {
                      this.recognition.start();
                    } catch (e) {
                      console.error('Recognition start error:', e);
                      this.labelInform.string = 'Cannot start recognition.';
                    }
                  } else {
                    console.log('Stop speech recognition.');
                    this.labelInform.string = 'Speech recognition stopped!';
                    this.isRecording = false;
                    this.UpdateButtonState();
                    this.recognition.stop();
                  }
                  this.PermissionCheck();
                case 9:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function OnVoiceButtonPressed() {
            return _OnVoiceButtonPressed.apply(this, arguments);
          }
          return OnVoiceButtonPressed;
        }();
        _proto.UpdateButtonState = function UpdateButtonState() {
          if (this.btnVoiceInput) {
            var label = this.btnVoiceInput.getComponentInChildren(Label);
            if (label) {
              label.string = this.isRecording ? 'Stop' : 'Start';
            }
          }
        };
        _proto.onDestroy = function onDestroy() {
          if (this.btnVoiceInput) {
            this.btnVoiceInput.node.off(Button.EventType.CLICK, this.OnVoiceButtonPressed, this);
          }
        };
        _proto.PermissionCheck = function PermissionCheck() {
          var _this3 = this;
          if (navigator.permissions && navigator.permissions.query) {
            navigator.permissions.query({
              name: 'microphone'
            }).then(function (s) {
              console.log('permissions.microphone state =', s.state);
              _this3.labelDebug.string = 'permissions.microphone state = ' + s.state;
              s.onchange = function () {
                console.log('perm changed ->', s.state);
                _this3.labelDebug.string = 'perm changed = ' + s.state;
              };
            })["catch"](function (e) {
              return console.warn('perm query error', e);
            });
          } else {
            console.warn('Permissions API not available in this WebView');
          }
        }

        /**
         * 🔸 Gọi Telegram WebApp API để xin quyền microphone (nếu chạy trong Telegram)
         * Trả về:
         * - 'granted' nếu user cho phép
         * - 'denied' nếu từ chối
         * - 'unknown' nếu không chạy trong Telegram
         */;
        _proto.RequestMicPermissionTelegram = /*#__PURE__*/
        function () {
          var _RequestMicPermissionTelegram = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  return _context2.abrupt("return", new Promise(function (resolve) {
                    var _Telegram;
                    var tg = (_Telegram = window.Telegram) == null ? void 0 : _Telegram.WebApp;
                    if (!tg || !tg.requestPermission) {
                      console.log('Telegram WebApp SDK not available, using browser permission.');
                      resolve('unknown');
                      return;
                    }
                    try {
                      tg.ready();
                      tg.requestPermission('microphone', function (status) {
                        console.log('Telegram mic permission:', status);
                        resolve(status);
                      });
                    } catch (e) {
                      console.warn('Telegram mic permission error:', e);
                      resolve('unknown');
                    }
                  }));
                case 1:
                case "end":
                  return _context2.stop();
              }
            }, _callee2);
          }));
          function RequestMicPermissionTelegram() {
            return _RequestMicPermissionTelegram.apply(this, arguments);
          }
          return RequestMicPermissionTelegram;
        }();
        return Voiceinput;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "btnVoiceInput", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "inputField", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "labelInform", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "labelDebug", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});