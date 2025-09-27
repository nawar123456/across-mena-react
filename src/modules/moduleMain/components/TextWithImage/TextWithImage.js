import './TextWithImage.css';

const TextWithImage = ({image,title,text,text2}) => {




  return (
    <section className='textwithimage-parent'>





		<div className='textwithimage-right'>
        <img src={image} alt={'about'} className='textwithimage-right__img' loading='lazy' />
    </div>

		<div className='textwithimage-left'>

<h2 className='textwithimage-left__h2'>
		{title}
</h2>
<p className='textwithimage-left__p'>
{text}
</p>

<p className='textwithimage-left__p'>
{text2}
</p>

</div>

    </section>
  )
}

export default TextWithImage
