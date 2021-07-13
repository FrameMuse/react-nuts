componentExt="tsx"
styleExt="scss"
indexExt="ts"

mkdir src/app/components/$1
touch src/app/components/$1/$1.$componentExt
touch src/app/components/$1/$1.style.$styleExt
touch src/app/components/$1/$1.test.$indexExt
touch src/app/components/$1/index.$indexExt

echo "import \"./$1.style.$styleExt\"
interface $1Props {
  children?: any
}
export function $1(props: $1Props) {
  return (
    <div>
    </div>
  )
}
" > src/app/components/$1/$1.$componentExt;

lower1=$(echo "$1" | tr '[:upper:]' '[:lower:]');

echo ".$lower1 {
}" > src/app/components/$1/$1.style.$styleExt
# echo "" > src/app/components/$1/$1.tsx