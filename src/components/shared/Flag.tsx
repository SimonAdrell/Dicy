import Svg, {Circle, G, Mask, Path, SvgProps} from 'react-native-svg';

type CountryProps = SvgProps & {
  height: number;
  width: number;
};

const UkFlag: React.FC<CountryProps> = (props: CountryProps) => {
  return (
    <Svg {...props} viewBox="0 0 600 500">
      <Mask id="a">
        <Circle cx={256} cy={256} r={256} fill="#fff" />
      </Mask>
      <G mask="url(#a)">
        <Path
          fill="#eee"
          d="m0 0 8 22-8 23v23l32 54-32 54v32l32 48-32 48v32l32 54-32 54v68l22-8 23 8h23l54-32 54 32h32l48-32 48 32h32l54-32 54 32h68l-8-22 8-23v-23l-32-54 32-54v-32l-32-48 32-48v-32l-32-54 32-54V0l-22 8-23-8h-23l-54 32-54-32h-32l-48 32-48-32h-32l-54 32L68 0H0z"
        />
        <Path
          fill="#0052b4"
          d="M336 0v108L444 0Zm176 68L404 176h108zM0 176h108L0 68ZM68 0l108 108V0Zm108 512V404L68 512ZM0 444l108-108H0Zm512-108H404l108 108Zm-68 176L336 404v108z"
        />
        <Path
          fill="#d80027"
          d="M0 0v45l131 131h45L0 0zm208 0v208H0v96h208v208h96V304h208v-96H304V0h-96zm259 0L336 131v45L512 0h-45zM176 336 0 512h45l131-131v-45zm160 0 176 176v-45L381 336h-45z"
        />
      </G>
    </Svg>
  );
};

const SeFlag: React.FC<CountryProps> = (props: CountryProps) => {
  return (
    <Svg {...props} viewBox="0 0 600 500">
      <Mask id="a">
        <Circle cx={256} cy={256} r={256} fill="#fff" />
      </Mask>
      <G mask="url(#a)">
        <Path
          fill="#0052b4"
          d="M0 0h133.6l35.3 16.7L200.3 0H512v222.6l-22.6 31.7 22.6 35.1V512H200.3l-32-19.8-34.7 19.8H0V289.4l22.1-33.3L0 222.6z"
        />
        <Path
          fill="#ffda44"
          d="M133.6 0v222.6H0v66.8h133.6V512h66.7V289.4H512v-66.8H200.3V0z"
        />
      </G>
    </Svg>
  );
};

export {SeFlag, UkFlag};
