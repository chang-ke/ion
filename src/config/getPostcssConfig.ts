import rucksack from 'rucksack-css';
import autoprefixer from 'autoprefixer';
import px2rem from 'postcss-px2rem';
import { IonConfig } from '../util/resolveConfig';

function getPostcssConfig({ postcss }: IonConfig) {
  const plugins: any[] = [rucksack()];
  if (postcss) {
    if (postcss.autoprefixer) {
      plugins.push(autoprefixer(postcss.autoprefixer));
    }
    if (postcss.pxtorem) {
      plugins.push(px2rem(postcss.pxtorem));
    }
  }
  return {
    ident: 'postcss',
    plugins,
  };
}

export default getPostcssConfig;
