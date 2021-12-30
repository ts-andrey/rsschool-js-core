const content = `
<div class="dresser-wrapper main-box__dresser-wrapper">
<section class="config dresser-wrapper__config">
  <div class="features config__features">
    <ul class="features__list config__list">
      <li class="features__item">
        <p class="features__description">Музыка:</p>
        <svg
          class="features__sound-icon features__icon"
          version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
          <path fill="#fff" d="M64 18.244c-0.474 0.285-1.581 1.148-2.462 1.918-1.944 1.7-5.731 4.975-10.831 9.366-2.099 1.807-4.48 3.865-5.292 4.574s-3.6 3.124-6.195 5.37l-4.718 4.082-28.262 0.139-0.891 0.611c-0.49 0.336-1.147 1.056-1.459 1.6l-0.567 0.989v35.446l0.616 1.1c0.376 0.671 1 1.317 1.6 1.658l0.984 0.557 27.429 0.008 0.932 0.8c0.512 0.44 0.987 0.856 1.055 0.924 0.13 0.132 6.748 5.84 7.989 6.891 0.4 0.338 1.231 1.065 1.846 1.615s2.725 2.376 4.688 4.060c1.963 1.683 3.625 3.117 3.693 3.186 0.13 0.132 1.69 1.484 6.521 5.653 4.016 3.466 5.63 3.967 7.875 2.447 2.023-1.37 1.85 2.983 1.85-46.481v-43.889l-0.551-0.98c-1.124-2-3.941-2.791-5.849-1.643zM102.625 18.777c-2.242 1.511-2.55 4.209-0.767 6.723 3.863 5.447 5.018 7.303 6.942 11.151 10.562 21.13 8.325 47.401-5.629 66.095-3.062 4.102-3.069 6.967-0.021 8.522 3.198 1.631 5.517-0.249 10.512-8.52 15.466-25.61 13.755-57.919-4.332-81.783-2.087-2.753-4.633-3.584-6.705-2.188zM91.454 30.1c-2.829 1.602-2.962 4.046-0.421 7.77 11.034 16.178 11.216 37.406 0.46 53.575-2.745 4.126-2.816 6.426-0.25 8.085 3.403 2.199 5.926 0.296 10.224-7.715 8.571-15.974 8.904-35.587 0.879-51.815-4.509-9.118-7.489-11.827-10.892-9.9zM79.272 42.289c-2.855 1.405-3.005 3.72-0.55 8.475 0.96 1.859 1.87 3.797 2.023 4.308 2.712 9.059 1.95 16.929-2.449 25.286-1.752 3.329-1.555 5.447 0.639 6.865 2.99 1.933 5.24 0.743 7.71-4.076 5.969-11.649 5.896-25.047-0.2-36.624-2.301-4.37-4.39-5.604-7.172-4.234z"></path>
        </svg>
      </li>
      <li class="features__item">
        <p class="features__description">Снег:</p>
        <svg
          class="features__snow-icon features__icon"
          version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" >
          <path fill="#fff" d="M61.873 8.408c-1.257 0.297-2.754 1.479-3.479 2.747-0.24 0.421-0.498 3.22-0.606 6.583l-0.188 5.851-1.097-1.28c-4.324-5.045-6.001-5.957-9.453-5.146-5.089 1.197-5.714 6.791-1.316 11.786 3.503 3.978 5.234 5.96 7.295 8.348 1.106 1.282 2.627 3.001 3.378 3.82l1.367 1.49 0.009 9.751-1.188-0.713c-1.749-1.049-5.237-2.941-8.041-4.362-2.471-1.252-3.571-2.308-3.571-3.429 0-0.331-0.306-1.405-0.679-2.387-1.018-2.676-1.922-5.309-2.246-6.54-2.307-8.774-4.516-11.886-8.434-11.886-4.556 0-7.424 4.499-5.644 8.855 0.353 0.862 0.765 2.062 0.918 2.665s0.403 1.406 0.558 1.783c0.22 0.536-0.349 0.344-2.609-0.879-7.756-4.199-7.458-4.082-9.897-3.902-3.62 0.267-5.611 2.332-5.611 5.82 0 3.377 1.108 4.45 8.96 8.675 2.902 1.562 3.161 1.852 1.652 1.852-4.691 0-8.813 2.411-9.327 5.456-0.974 5.766 2.682 8.468 9.525 7.042 2.1-0.438 5.588-1.139 7.75-1.559s5.395-1.078 7.184-1.464c1.969-0.424 3.413-0.571 3.657-0.373 0.222 0.18 0.98 0.642 1.684 1.027 5.020 2.742 7.68 4.295 7.68 4.486 0 0.271-4.588 2.938-5.054 2.938-0.183 0-0.784 0.355-1.336 0.79-1.223 0.962-2.425 0.952-7.128-0.061-1.918-0.413-5.050-1.065-6.962-1.449s-4.709-0.957-6.217-1.274c-3.498-0.734-4.122-0.719-5.775 0.136-5.867 3.035-3.995 10.951 2.815 11.901 4.483 0.625 4.841 0.833 3.051 1.764-0.553 0.288-2.323 1.23-3.931 2.092s-3.507 1.86-4.217 2.216c-6.174 3.095-5.203 11.342 1.407 11.941 2.287 0.207 2.936-0.007 7.199-2.379 1.408-0.783 3.514-1.947 4.68-2.584l2.12-1.16-0.257 1.373c-0.142 0.755-0.558 2.033-0.924 2.839-2.409 5.303 1.64 10.772 6.922 9.35 3.326-0.895 3.454-1.139 8.536-16.294 2.289-6.825 1.372-5.891 10.465-10.66l2.285-1.199v14.423l-2.060 2.374c-1.133 1.306-2.984 3.43-4.114 4.72s-2.383 2.721-2.786 3.18c-0.402 0.459-1.554 1.766-2.56 2.902-4.552 5.146-4.739 8.965-0.577 11.769 2.928 1.974 6.198 0.906 9.59-3.13l2.325-2.766 0.194 4.918c0.27 6.826 1.48 8.53 6.060 8.53 4.624 0 5.993-1.981 6.009-8.694l0.011-4.792 0.943 1.097c5.19 6.038 8.83 7.133 12.189 3.668 3.313-3.418 1.696-7.846-5.425-14.864-0.329-0.325-1.504-1.639-2.61-2.921s-2.711-3.091-3.566-4.019l-1.554-1.689v-7.185c0-3.952 0.091-7.185 0.203-7.185s1.058 0.473 2.103 1.050c1.045 0.577 3.382 1.833 5.192 2.789 6.050 3.197 5.118 1.837 8.773 12.797 3.617 10.847 4.248 11.95 7.12 12.435 6.022 1.017 9.061-3.409 6.776-9.872-0.498-1.408-0.906-2.758-0.906-3.001-0.001-0.389 6.569 2.774 7.478 3.6 0.574 0.522 4.182 0.356 5.347-0.246 2.643-1.367 4.123-5.494 2.856-7.965-0.47-0.918-2.538-3.176-2.907-3.176-0.136 0-1.694-0.808-3.462-1.795l-3.214-1.795 1.43-0.397c0.787-0.219 1.771-0.398 2.187-0.399 4.389-0.012 8.013-3.91 7.15-7.691-0.942-4.125-3.797-5.584-8.946-4.572-5.249 1.032-9.836 1.962-13.475 2.733-4.73 1.002-5.788 0.959-8.074-0.325-1.053-0.591-3.069-1.702-4.479-2.469-4.774-2.594-4.71-2.213-0.727-4.334 2.566-1.366 5.397-2.898 7.945-4.298 1.336-0.734 1.418-0.737 4.388-0.12 1.665 0.346 4.672 0.965 6.684 1.375s5.009 1.060 6.661 1.444c6.838 1.59 10.71-0.362 10.71-5.398 0-3.775-1.237-5.015-6.328-6.345l-3.586-0.937 3.061-1.718c4.357-2.446 5.391-3.723 5.391-6.658 0-6.601-8.586-7.954-14.793-2.331-0.832 0.754-0.769 0.128 0.271-2.702 1.482-4.035 1.665-6.391 0.639-8.218-2.413-4.294-9.031-4.16-10.894 0.221-0.698 1.641-4.067 11.168-4.477 12.66-0.415 1.512-2.453 7.157-2.614 7.244-0.072 0.039-0.512 0.283-0.976 0.544s-1.946 1.064-3.291 1.786c-1.346 0.721-3.187 1.724-4.092 2.229-2.639 1.47-4.853 2.643-4.992 2.643-0.282 0-0.108-9.822 0.177-9.935 0.168-0.067 2.178-2.261 4.467-4.876s5.443-6.21 7.009-7.989l2.847-3.234v-2.561c0-3.982-2.053-6.148-5.827-6.148-2.519 0-3.037 0.303-6.144 3.596l-2.645 2.804-0.006-5.896-0.006-5.896-1.371-1.533c-1.766-1.974-3.751-2.532-6.607-1.856z"></path>
        </svg>
      </li>
    </ul>
  </div>
  <div class="config-tree config__trees">
    <h4 class="config-tree__header config__header">Выбор ёлки</h4>
    <ul class="config-tree__list config__list">
      <li class="config-tree__item">
        <img data-num="1" class="config-tree__img" src="./assets/tree/1.webp" alt="option of xmas-tree image" />
      </li>
      <li class="config-tree__item">
        <img data-num="2" class="config-tree__img" src="./assets/tree/2.webp" alt="option of xmas-tree image" />
      </li>
      <li class="config-tree__item">
        <img data-num="3" class="config-tree__img" src="./assets/tree/3.webp" alt="option of xmas-tree image" />
      </li>
      <li class="config-tree__item">
        <img data-num="4" class="config-tree__img" src="./assets/tree/4.webp" alt="option of xmas-tree image" />
      </li>
      <li class="config-tree__item">
        <img data-num="5" class="config-tree__img" src="./assets/tree/5.webp" alt="option of xmas-tree image" />
      </li>
      <li class="config-tree__item">
        <img data-num="6" class="config-tree__img" src="./assets/tree/6.webp" alt="option of xmas-tree image" />
      </li>
    </ul>
  </div>
  <div class="config-background config__background">
    <h4 class="config-background__header config__header">Выбор фона</h4>
    <ul class="config-background__list config__list">
      <li class="config-background__item">
        <img data-num="1" src="./assets/bg/1.webp" alt="xmas-tree background option" class="config-background__img" />
      </li>
      <li class="config-background__item">
        <img data-num="2" src="./assets/bg/2.webp" alt="xmas-tree background option" class="config-background__img" />
      </li>
      <li class="config-background__item">
        <img data-num="3" src="./assets/bg/3.webp" alt="xmas-tree background option" class="config-background__img" />
      </li>
      <li class="config-background__item">
        <img data-num="4" src="./assets/bg/4.webp" alt="xmas-tree background option" class="config-background__img" />
      </li>
      <li class="config-background__item">
        <img data-num="5" src="./assets/bg/5.webp" alt="xmas-tree background option" class="config-background__img" />
      </li>
      <li class="config-background__item">
        <img data-num="6" src="./assets/bg/6.webp" alt="xmas-tree background option" class="config-background__img" />
      </li>
      <li class="config-background__item">
        <img data-num="7" src="./assets/bg/7.webp" alt="xmas-tree background option" class="config-background__img" />
      </li>
      <li class="config-background__item">
        <img data-num="8" src="./assets/bg/8.webp" alt="xmas-tree background option" class="config-background__img" />
      </li>
      <li class="config-background__item">
        <img data-num="9" src="./assets/bg/9.webp" alt="xmas-tree background option" class="config-background__img" />
      </li>
      <li class="config-background__item">
        <img data-num="10" src="./assets/bg/10.webp" alt="xmas-tree background option" class="config-background__img" />
      </li>
    </ul>
  </div>
  <div class="config-light config__light">
    <h4 class="config-light__header config__header">Выбор гирлянды</h4>
    <ul class="config-light__list config__list">
      <li data-type="one" data-color="255, 255, 255" class="config-light__item config-light__item_color_white"></li>
      <li data-type="one" data-color="255, 0, 0" class="config-light__item config-light__item_color_red"></li>
      <li data-type="one" data-color="0, 255, 0" class="config-light__item config-light__item_color_green"></li>
      <li data-type="one" data-color="0, 0, 255" class="config-light__item config-light__item_color_blue"></li>
      <li data-type="one" data-color="255, 255, 0" class="config-light__item config-light__item_color_yellow"></li>
      <li data-type="one" data-color="255, 0, 200" class="config-light__item config-light__item_color_pink"></li>
      <li data-type="many-default" class="config-light__item config-light__item_color_multy"></li>
    </ul>
    <ul class="config-light__custom-list">
      <li class="color-pick config-light__custom-item">
        <p class="color-pick__description">Свой цвет</p>
        <input data-type="one" type="color" name="color-pick-single" value="#ff0000" class="color-pick__single-picker" />
      </li>
      <li class="color-pick config-light__custom-item">
        <p class="color-pick__description">Своя цветовая схема</p>
        <div class="color-pick__wrapper">
          <input data-type="many" data-num="0" type="color" name="color-pick-multiple" value="#ff0000" class="color-pick__multiple-picker" />
          <input data-type="many" data-num="1" type="color" name="color-pick-multiple-picker" value="#00ff00" class="color-pick__multiple-picker"/>
          <input data-type="many" data-num="2" type="color" name="color-pick-multiple" value="#0000ff" class="color-pick__multiple-picker" />
        </div>
      </li>
    </ul>

    <ul class="light-options config-light__option-list config__list">
      <li class="config-light__option-item config-light__option-switch">
        <p class="light-options__switcher-condition">Состояние:</p>
        <p class="light-options__switcher-box">
          <span class="light-options__switcher"></span>
          <span class="light-options__switcher-value">Выкл</span>
        </p>
      </li>

      <li class="config-light__option-brightness config-light__option-item">
        <h4 class="config-light__option-header">Выбор яркости</h4>
        <div class="light-options__brightness-wrapper light-options__value-wrapper">
          <p class="light-options__brightness-current">
            Текущая яркость: <span class="light-options__brightness-value light-options__current-value">100</span>%
          </p>
          <svg class="light-options__show-icon" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M33.17 17.17l-9.17 9.17-9.17-9.17-2.83 2.83 12 12 12-12z" />
            <path d="M0 0h48v48h-48z" fill="none" />
          </svg>
        </div>

        <ul class="light-options__brightness-list">
          <li class="light-options__brightness-item">180</li>
          <li class="light-options__brightness-item">160</li>
          <li class="light-options__brightness-item">140</li>
          <li class="light-options__brightness-item">120</li>
          <li class="light-options__brightness-item">100</li>
          <li class="light-options__brightness-item">80</li>
          <li class="light-options__brightness-item">70</li>
        </ul>
      </li>

      <li class="config-light__option-speed config-light__option-item">
        <h4 class="config-light__option-header">Выбор скорости</h4>
        <div class="light-options__speed-wrapper light-options__value-wrapper">
          <p class="light-options__speed-current">
            Текущая скорость: <span class="light-options__speed-value light-options__current-value">1</span>
          </p>
          <svg class="light-options__show-icon" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M33.17 17.17l-9.17 9.17-9.17-9.17-2.83 2.83 12 12 12-12z" />
            <path d="M0 0h48v48h-48z" fill="none" />
          </svg>
        </div>

        <ul class="light-options__speed-list">
          <li class="light-options__speed-item">4</li>
          <li class="light-options__speed-item">3.5</li>
          <li class="light-options__speed-item">3</li>
          <li class="light-options__speed-item">2.5</li>
          <li class="light-options__speed-item">2</li>
          <li class="light-options__speed-item">1.5</li>
          <li class="light-options__speed-item">1</li>
          <li class="light-options__speed-item">0.75</li>
          <li class="light-options__speed-item">0.5</li>
        </ul>
      </li>

    </ul>
  </div>
</section>

<section class="xmas-tree dresser-wrapper__xmas-tree">
  <div class="xmas-tree__img-wrapper">

    <img class="xmas-tree__img" src="./assets/tree/1.webp"" usemap="#image-map">

    <map name="image-map">
    <area  alt="" title="" coords="236,0,1,0,0,590,69,533,87,513,16,442,104,430,106,390,69,361,93,338,137,354,102,314,150,297,113,265,128,249,100,222,128,207,178,214,168,175,156,130,172,115,204,144,191,96,232,36" shape="poly">
    <area  alt="" title="" coords="500,1,265,0,301,65,315,76,282,111,282,122,310,110,306,161,352,132,363,157,339,179,359,225,391,207,405,218,411,238,369,264,400,286,401,304,370,317,389,342,432,340,435,371,373,390,371,406,414,403,415,431,454,441,463,469,426,482,441,523,500,529" shape="poly">
    <area  alt="" title="" coords="184,712,26,568,1,592,0,708,3,713" shape="poly">
    <area  alt="" title="" coords="498,541,441,670,387,666,373,696,156,658,137,713,498,713" shape="poly">
    </map>

    <ul class="xmas-tree__light-row-list">
      <li class="xmas-tree__light-row xmas-tree__light-row_num_1">
        <ul class="xmas-tree__light-rope">
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
        </ul>
      </li>
      <li class="xmas-tree__light-row xmas-tree__light-row_num_2">
        <ul class="xmas-tree__light-rope">
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
        </ul>
      </li>
      <li class="xmas-tree__light-row xmas-tree__light-row_num_3">
        <ul class="xmas-tree__light-rope">
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
        </ul>
      </li>
      <li class="xmas-tree__light-row xmas-tree__light-row_num_4">
        <ul class="xmas-tree__light-rope">
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
        </ul>
      </li>
      <li class="xmas-tree__light-row xmas-tree__light-row_num_5">
        <ul class="xmas-tree__light-rope">
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
        </ul>
      </li>
      <li class="xmas-tree__light-row xmas-tree__light-row_num_6">
        <ul class="xmas-tree__light-rope">
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
        </ul>
      </li>
      <li class="xmas-tree__light-row xmas-tree__light-row_num_7">
        <ul class="xmas-tree__light-rope">
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
          <li class="xmas-tree__light-bulb"></li>
        </ul>
      </li>
    </ul>
  </div>
  <span class="xmas-tree__snow"></span>
  <span class="xmas-tree__snow"></span>
  <span class="xmas-tree__snow"></span>
  <span class="xmas-tree__snow"></span>
  <span class="xmas-tree__snow"></span>
  <span class="xmas-tree__snow"></span>
</section>

<section class="decoration dresser-wrapper__decoration">
  <div class="decor-toys decoration__toys">
    <h4 class="decor-toys__header decoration__header">Игрушки:</h4>
    <ul class="decor-toys__list decoration__list">
    </ul>
  </div>

  <div class="clear dresser-wrapper__clear">
    <span class="clear__btn">Очистить хранилище</span>
  </div>

</section>

</div>
`;

const toyContent = (imgNum: string, toyCount: string, toyOrder: number, isPicked?: boolean) => `
<li class="decor-toys__item ${isPicked ? 'decor-toys__item_state_picked ' : ''}">
<img data-num="${toyOrder}" src="./assets/toys/${imgNum}.webp" alt="toy for xmas tree" class="decor-toys__img" draggable="true"/>
<span data-num="${toyOrder}" class="decor-toys__counter">${toyCount}</span>
</li>
`;

export class DecoratorView {
  targetContentPlace: HTMLElement;

  constructor() {
    this.targetContentPlace = document.querySelector(`.main-box`);
  }

  renderContent() {
    this.targetContentPlace.innerHTML = content;
  }
  renderToyList(toyRenderHandler: () => void) {
    return toyRenderHandler();
  }

  renderToy(imgNum: string, toyCount: string, toyOrder: number, isPicked?: boolean) {
    return toyContent(imgNum, toyCount, toyOrder, isPicked);
  }
}
